package com.cranecoding.serviceImp;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cranecoding.dto.exercise.ExerciseDAO;
import com.cranecoding.dto.exercise.ExerciseDTO;
import com.cranecoding.dto.testcase.TestCaseDAO;
import com.cranecoding.dto.testcase.TestCaseDTO;
import com.cranecoding.model.Exercise;
import com.cranecoding.model.TestCase;
import com.cranecoding.service.AdminService;

@Service
public class AdminServiceIml implements AdminService {

	@Autowired
	ExerciseDAO exerciseDAO;
	
	@Autowired
	TestCaseDAO testCaseDAO;
	
	@Override
	public boolean createExercise(ExerciseDTO exerciseInfo) {
		Exercise exerciseToSave = new Exercise();
		exerciseToSave.setExerciseanswer(exerciseInfo.getExerciseAnswer());
		exerciseToSave.setExercisecontent(exerciseInfo.getExerciseContent());
		exerciseToSave.setExercisename(exerciseInfo.getExerciseName());
		exerciseToSave.setPseudocode(exerciseInfo.getPseudoCode());
		boolean toReturn =  exerciseDAO.save(exerciseToSave) != null;
		exerciseToSave.getExerciseid();
		createTestCase(exerciseInfo.getExerciseTestCases(), exerciseToSave);
		return toReturn;
	}

	@Override
	public boolean updateExercise(ExerciseDTO exerciseInfo) {
		Exercise exerciseToUpdate = exerciseDAO.findOne(exerciseInfo.getIdExercise());
		exerciseToUpdate.setExerciseanswer(exerciseInfo.getExerciseAnswer());
		exerciseToUpdate.setExercisecontent(exerciseInfo.getExerciseContent());
		exerciseToUpdate.setExercisename(exerciseInfo.getExerciseName());
		exerciseToUpdate.setPseudocode(exerciseInfo.getPseudoCode());
		boolean toReturn = exerciseDAO.save(exerciseToUpdate) != null;
		
		deleteTestCase(exerciseToUpdate);
		createTestCase(exerciseInfo.getExerciseTestCases(), exerciseToUpdate);
		return toReturn;
	}
	
	private void createTestCase(List<TestCaseDTO> listTestCaseDTO, Exercise exercise){
		for(int i = 0 ; i< listTestCaseDTO.size() ; i++){
			TestCase testCaseTemp = new TestCase();
			testCaseTemp.setExercise(exercise);
			testCaseTemp.setInnput(listTestCaseDTO.get(i).getInput());
			testCaseTemp.setOutput(listTestCaseDTO.get(i).getOutput());
			testCaseDAO.save(testCaseTemp);
		}
	}
	
	private void deleteTestCase(Exercise exercise){
		List<TestCase> toDelete = testCaseDAO.getListCaseByExerciseId(exercise.getExerciseid());
		for(int i = 0;i < toDelete.size() ; i++){
			testCaseDAO.delete(toDelete.get(i));
		}
	}

	@Override
	public boolean deleteExercise(int exerciseId) {
		if(exerciseDAO.findOne(exerciseId) != null){
			exerciseDAO.delete(exerciseId);
			return true;
		}
		return false;
	}

	@Override
	public List<Exercise> getAllExercise() {
		return exerciseDAO.getAllExercise();
	}
	
}
