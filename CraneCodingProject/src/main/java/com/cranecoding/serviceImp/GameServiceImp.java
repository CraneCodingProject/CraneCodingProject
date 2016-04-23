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
	ExerciseDAO exerciseDAO;

	@Override
	public List<ExerciseDTO> getAllExercise(int userId) {
		List<ExerciseDTO> listExerciseDTOs = new ArrayList<>();
		for (Exercise exercise : exerciseDAO.getAllExerciseByUserName(userId)) {
			listExerciseDTOs.add(convertToExerciseDTO(exercise));
		}
		return listExerciseDTOs;
	}

	@Override
	public ExerciseDTO getExerciseById(int exerciseid) {
		return convertToExerciseDTO(exerciseDAO.getExerciseById(exerciseid));
	}

	private ExerciseDTO convertToExerciseDTO(Exercise exercise) {
		ExerciseDTO exerciseDto = new ExerciseDTO(exercise.getExerciseid(), exercise.getExercisename(),
				exercise.getExercisecontent());
		return exerciseDto;
	}
}
