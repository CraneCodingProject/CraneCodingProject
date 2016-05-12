package com.cranecoding.service;

import org.springframework.stereotype.Service;

import com.cranecoding.dto.exercise.ExerciseDTO;

@Service
public interface AdminService {
	boolean createExercise(ExerciseDTO exerciseInfo);

	boolean updateExercise(ExerciseDTO exerciseInfo);

	boolean deleteExercise(int exerciseId);
}
