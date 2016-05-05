package com.cranecoding.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cranecoding.dto.exercise.ExerciseDTO;
import com.cranecoding.model.TestCase;

@Service
public interface GameService {
	
	List<ExerciseDTO> getAllExercise(int userId);
	ExerciseDTO getExerciseById(int exerciseid);
	void openExerciseNewUser(int userId);
	List<TestCase> getTestCaseByExerciseId(int exerciseId);
	int openNextExercise(int exerciseId,String username);
	void saveScore(int exerciseid, String username, int star, String time);
}
