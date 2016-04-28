package com.cranecoding.dto.exercise;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.cranecoding.model.Exercise;

public interface ExerciseDAO extends CrudRepository<Exercise, Integer> {

	@Query(value = "select * from exercise where exerciseid IN (select exercise_exerciseid from score where user_userid = :userId);", nativeQuery = true)
	List<Exercise> getAllExerciseByUserId(@Param("userId") int userId);

	@Query(value = "select * from exercise where exerciseid = :idExercise", nativeQuery = true)
	Exercise getExerciseById(@Param("idExercise") int idExercise);
	
}
