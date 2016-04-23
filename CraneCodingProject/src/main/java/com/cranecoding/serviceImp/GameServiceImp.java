package com.cranecoding.serviceImp;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cranecoding.dto.exercise.ExerciseDAO;
import com.cranecoding.dto.exercise.ExerciseDTO;
import com.cranecoding.model.Exercise;
import com.cranecoding.service.GameService;
@Service
public class GameServiceImp implements GameService {

	@Autowired
	private ExerciseDAO exerciseDao;

	@Override
	public List<ExerciseDTO> getAllExercise() {
		List<ExerciseDTO> exerciseDTOs = new ArrayList<>();
		for (Exercise exercise : exerciseDao.getAllExercise() ){
			exerciseDTOs.add(converToDTO(exercise));
		}
		return  exerciseDTOs;
	}

	@Override
	public ExerciseDTO getExerciseById(int id) {
		return converToDTO(exerciseDao.getExerciseById(id));
	}
	
	private ExerciseDTO converToDTO(Exercise exercise){
		ExerciseDTO caculationDTO = new ExerciseDTO(exercise.getExerciseid(),exercise.getExercisename(),exercise.getPseudocode(),exercise.getExercisecontent());
		
		return caculationDTO;
		
	}

}
