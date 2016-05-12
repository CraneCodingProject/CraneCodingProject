package com.cranecoding.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cranecoding.dto.exercise.ExerciseDTO;
import com.cranecoding.model.Exercise;

@Service
public interface AdminService {
	boolean createExercise(ExerciseDTO exerciseInfo);

	boolean updateExercise(ExerciseDTO exerciseInfo);

	boolean deleteExercise(int exerciseId);

	List<Exercise> getAllExercise();
}
