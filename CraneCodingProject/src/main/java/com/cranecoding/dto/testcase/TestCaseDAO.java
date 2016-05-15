package com.cranecoding.dto.testcase;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.cranecoding.model.Exercise;
import com.cranecoding.model.TestCase;

public interface TestCaseDAO extends CrudRepository<TestCase, Integer> {
	
	@Query(value = "select * from test_case where exercise_exerciseid = :exerciseId", nativeQuery=true)
	List<TestCase> getListCaseByExerciseId(@Param("exerciseId") int exerciseId);
}
