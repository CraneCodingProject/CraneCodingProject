package com.cranecoding.serviceImp;

import java.util.ArrayList;
import java.util.List;

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
		Exercise exercise = exerciseDAO.getExerciseById(22);
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
		List<TestCaseDTO> listTestCaseToReturn = new ArrayList<>();
		// for (TestCase caseResult :
		// testCaseDao.getListCaseByExerciseId(exerciseId))
		// listTestCaseToReturn.add(converToTestCaseDTO(caseResult));
		return testCaseDao.getListCaseByExerciseId(exerciseId);
	}

	@Override
	public int openNextExercise(int exerciseId, String username) {
		Score newExercise = new Score();
		newExercise.setExercise(exerciseDAO.getExerciseById(exerciseId));
		newExercise.setUser(userDAO.getUserById(userDAO.getUserIdByUserName(username).getUserid()));
		newExercise.setBlock("");
		newExercise.setScoreid(0);
		newExercise.setTime(0);
		newExercise.setStatus(0);
		newExercise.setStar(0);
		scoreDAO.save(newExercise);
		return exerciseId;
	}

	@Override
	public void saveScore(int exerciseid, String username, int star, int time) {
		Score currentExercise = scoreDAO.getScoreByUserIdAndExerciseId(userDAO.getUserIdByUserName(username).getUserid(),
				exerciseid);
		currentExercise.setStar(star);
		currentExercise.setTime(time);
		scoreDAO.save(currentExercise);
	}

	private ExerciseDTO convertToExerciseDTO(Exercise exercise) {
		ExerciseDTO exerciseDto = new ExerciseDTO(exercise.getExerciseid(), exercise.getExercisename(),
				exercise.getExercisecontent());
		return exerciseDto;
	}

	private TestCaseDTO converToTestCaseDTO(TestCase caseToGet) {
		TestCaseDTO caseDto = new TestCaseDTO(caseToGet.getInnput(), caseToGet.getOutput(),
				caseToGet.getExercise().getExerciseid());
		return caseDto;
	}

}
