package com.cranecoding.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cranecoding.dto.exercise.ExerciseDTO;
import com.cranecoding.service.GameService;

@Controller
public class GameController  {
	@Autowired
	private GameService gameService;
	
	@RequestMapping(value = "/api/exercise/getallexercises", method = RequestMethod.GET)
	public @ResponseBody List<ExerciseDTO> getAllExercise(HttpServletRequest request) {
		return gameService.getAllExercise();
	}


}
