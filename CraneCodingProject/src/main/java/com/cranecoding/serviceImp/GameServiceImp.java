package com.cranecoding.serviceImp;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.PrintStream;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.InvocationTargetException;
import java.net.URL;
import java.net.URLClassLoader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Hashtable;
import java.util.List;

import javax.tools.Diagnostic;
import javax.tools.DiagnosticCollector;
import javax.tools.JavaCompiler;
import javax.tools.JavaCompiler.CompilationTask;
import javax.tools.JavaFileObject;
import javax.tools.ToolProvider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cranecoding.dto.exercise.ExerciseDAO;
import com.cranecoding.dto.exercise.ExerciseDTO;
import com.cranecoding.dto.score.ScoreDAO;
import com.cranecoding.dto.testcase.TestCaseDAO;
import com.cranecoding.dto.testcase.TestCaseDTO;
import com.cranecoding.dto.user.UserDAO;
import com.cranecoding.model.Exercise;
import com.cranecoding.model.Score;
import com.cranecoding.model.TestCase;
import com.cranecoding.service.GameService;

@Service
public class GameServiceImp implements GameService {

	@Autowired
	ExerciseDAO exerciseDAO;

	@Autowired
	UserDAO userDAO;

	@Autowired
	ScoreDAO scoreDAO;

	@Autowired
	TestCaseDAO testCaseDao;

	@Override
	public List<ExerciseDTO> getAllExercise(int userId) {
		List<ExerciseDTO> listExerciseDTOs = new ArrayList<>();
		for (Exercise exercise : exerciseDAO.getAllExerciseByUserId(userId)) {
			listExerciseDTOs.add(convertToExerciseDTO(exercise));
		}
		return listExerciseDTOs;
	}

	@Override
	public ExerciseDTO getExerciseById(int exerciseid) {
		return convertToExerciseDTO(exerciseDAO.getExerciseById(exerciseid));
	}

	@Override
	public void openExerciseNewUser(int userId) {
		Exercise exercise = exerciseDAO.getExerciseById(1);
		Score score = new Score();
		score.setUser(userDAO.getUserById(userId));
		score.setExercise(exercise);
		score.setTime(0);
		score.setStatus(0);
		score.setBlock("");
		score.setStar(0);
		scoreDAO.save(score);
	}

	@Override
	public List<TestCase> getTestCaseByExerciseId(int exerciseId) {
		// List<TestCaseDTO> listTestCaseToReturn = new ArrayList<>();
		// for (TestCase caseResult :
		// testCaseDao.getListCaseByExerciseId(exerciseId))
		// listTestCaseToReturn.add(converToTestCaseDTO(caseResult));
		return testCaseDao.getListCaseByExerciseId(exerciseId);
	}

	@Override
	public int openNextExercise(int exerciseId, String username) {
		if (scoreDAO.getScoreByUserIdAndExerciseId(userDAO.getUserIdByUserName(username).getUserid(),
				exerciseId) == null) {
			Score newExercise = new Score();
			newExercise.setExercise(exerciseDAO.getExerciseById(exerciseId));
			newExercise.setUser(userDAO.getUserById(userDAO.getUserIdByUserName(username).getUserid()));
			newExercise.setBlock("");
			newExercise.setScoreid(0);
			newExercise.setTime(0);
			newExercise.setStatus(0);
			newExercise.setStar(0);
			scoreDAO.save(newExercise);
		}
		return exerciseId;
	}

	@Override
	public void saveScore(int exerciseid, String username, int star, String time) {
		Score currentExercise = scoreDAO
				.getScoreByUserIdAndExerciseId(userDAO.getUserIdByUserName(username).getUserid(), exerciseid);
		currentExercise.setStar(star);
		double timeToSave = Double.parseDouble(time);
		currentExercise.setTime(timeToSave);
		scoreDAO.save(currentExercise);
	}

	private ExerciseDTO convertToExerciseDTO(Exercise exercise) {
		ExerciseDTO exerciseDto = new ExerciseDTO(exercise.getExerciseid(), exercise.getExercisename(),
				exercise.getExercisecontent(), exercise.getExerciseanswer());
		return exerciseDto;
	}

	private TestCaseDTO converToTestCaseDTO(TestCase caseToGet) {
		TestCaseDTO caseDto = new TestCaseDTO(caseToGet.getInnput(), caseToGet.getOutput(),
				caseToGet.getExercise().getExerciseid());
		return caseDto;
	}

	@Override
	public String returnBaseOnExIdAndParam(int exerciseid, String param)  {

		Exercise exerciseTemp = exerciseDAO.getExerciseById(exerciseid);
		ExerciseDTO exerciseToProcess = convertToExerciseDTO(exerciseTemp);
		System.out.println(exerciseToProcess.getExerciseAnswer());
		String parameter = "";
		try {
			System.out.println(returnResult(exerciseToProcess.getExerciseAnswer(), param));
			parameter = returnResult(exerciseToProcess.getExerciseAnswer(), param);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return parameter;
	}


	private String returnResult(String methodContain, String param) throws IOException{

		String method = methodContain.replace("placeToPutValue", param);

		JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
		DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<JavaFileObject>();

		StringWriter writer = new StringWriter();
		PrintWriter out = new PrintWriter(writer);
		out.println(
				"public class interpreClass {public static void main(String args[]) {"+method+"}}");
		out.close();
		JavaFileObject file = new JavaSourceFromString("interpreClass", writer.toString());

		Iterable<? extends JavaFileObject> compilationUnits = Arrays.asList(file);
		CompilationTask task = compiler.getTask(null, null, diagnostics, null, null, compilationUnits);

		boolean success = task.call();
		for (Diagnostic diagnostic : diagnostics.getDiagnostics()) {
			System.out.println(diagnostic.getCode());
			System.out.println(diagnostic.getKind());
			System.out.println(diagnostic.getPosition());
			System.out.println(diagnostic.getStartPosition());
			System.out.println(diagnostic.getEndPosition());
			System.out.println(diagnostic.getSource());
			System.out.println(diagnostic.getMessage(null));
		}

		if (success) {
			try {
				ByteArrayOutputStream baos = new ByteArrayOutputStream();
				PrintStream ps = new PrintStream(baos);
				// IMPORTANT: Save the old System.out!
				PrintStream old = System.out;
				// Tell Java to use your special stream
				System.setOut(ps);
				URLClassLoader classLoader = URLClassLoader.newInstance(new URL[] { new File("").toURI().toURL() });
				Class.forName("interpreClass", true, classLoader).getDeclaredMethod("main", new Class[] { String[].class })
				.invoke(null, new Object[] { null });
				System.out.flush();
				System.setOut(old);
				// Show what happened

				System.out.println("Here: " + baos.toString());
				return baos.toString();

			} catch (ClassNotFoundException e) {
				System.err.println("Class not found: " + e);
			} catch (NoSuchMethodException e) {
				System.err.println("No such method: " + e);
			} catch (IllegalAccessException e) {
				System.err.println("Illegal access: " + e);
			} catch (InvocationTargetException e) {
				System.err.println("Invocation target: " + e);
			}
		}
		return null;

	}

	@Override
	public Hashtable<String, Comparable> getRecordByUserId(int userId) {
		Hashtable hashTable = new Hashtable<>();
		List<Score> a = scoreDAO.getRecordByUserId(userId);
		for (int i = 0 ; i < a.size() ; i++) {
			List<Double> list = new ArrayList<>();
			list.add((double) a.get(i).getStar());
			list.add(a.get(i).getTime());
			hashTable.put(a.get(i).getExercise().getExerciseid(), list);
		}
		return hashTable;
	}

}
