package com.cranecoding.serviceImp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cranecoding.dto.exercise.ExerciseDAO;
import com.cranecoding.dto.exercise.ExerciseDTO;
import com.cranecoding.model.Exercise;
import com.cranecoding.service.AdminService;

@Service
public class AdminServiceIml implements AdminService {

	@Autowired
	ExerciseDAO exerciseDAO;
	
	@Override
	public boolean createExercise(ExerciseDTO exerciseInfo) {
		Exercise exerciseToSave = new Exercise();
		exerciseToSave.setExerciseanswer(exerciseInfo.getExerciseAnswer());
		exerciseToSave.setExercisecontent(exerciseInfo.getExerciseContent());
		exerciseToSave.setExercisename(exerciseInfo.getExerciseName());
		exerciseToSave.setPseudocode(exerciseInfo.getPseudoCode());
		return exerciseDAO.save(exerciseToSave) != null;
	}

	@Override
	public boolean updateExercise(ExerciseDTO exerciseInfo) {
		Exercise exerciseToUpdate = exerciseDAO.findOne(exerciseInfo.getIdExercise());
		exerciseToUpdate.setExerciseanswer(exerciseInfo.getExerciseAnswer());
		exerciseToUpdate.setExercisecontent(exerciseInfo.getExerciseContent());
		exerciseToUpdate.setExercisename(exerciseInfo.getExerciseName());
		exerciseToUpdate.setPseudocode(exerciseInfo.getPseudoCode());
		return exerciseDAO.save(exerciseToUpdate) != null;
	}

	@Override
	public boolean deleteExercise(int exerciseId) {
		if(exerciseDAO.findOne(exerciseId) != null){
			exerciseDAO.delete(exerciseId);
			return true;
		}
		return false;
	}
	
}
