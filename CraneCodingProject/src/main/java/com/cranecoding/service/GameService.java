package com.cranecoding.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cranecoding.dto.exercise.ExerciseDTO;

@Service
public interface GameService {
	
	List<ExerciseDTO> getAllExercise(int userId);

	ExerciseDTO getExerciseById(int exerciseid);
	
	
}