package com.cranecoding.dto.exercise;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.cranecoding.model.Exercise;



public interface ExerciseDAO extends CrudRepository<Exercise, Integer>  {
	
	@Query (value = "select * from exercise", nativeQuery = true)
	List<Exercise> getAllExercise();
	
	@Query(value ="select * from exercise where exerciseid = :idExercise", nativeQuery = true)
	Exercise getExerciseById(@Param("idExercise") int idExercise);
}
