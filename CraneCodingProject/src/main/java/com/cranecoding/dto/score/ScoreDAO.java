package com.cranecoding.dto.score;

import org.springframework.data.repository.CrudRepository;

import com.cranecoding.model.Score;

public interface ScoreDAO extends CrudRepository<Score, Integer> {

}
