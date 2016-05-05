package com.cranecoding.dto.score;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.cranecoding.model.Score;

public interface ScoreDAO extends CrudRepository<Score, Integer> {

	@Query(value = "select * from score where user_userid = :userId and exercise_exerciseid = :exerciseId", nativeQuery = true)
	Score getScoreByUserIdAndExerciseId(@Param("userId") int userId, @Param("exerciseId") int exerciseId);
	
	
	@Query(value = "select * from score where user_userid = :userId", nativeQuery = true)
	List<Score> getRecordByUserId(@Param("userId") int userId);

}
