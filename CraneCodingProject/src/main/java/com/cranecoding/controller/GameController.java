package com.cranecoding.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cranecoding.dto.exercise.ExerciseDTO;
import com.cranecoding.dto.user.UserDTO;
import com.cranecoding.service.GameService;
import com.cranecoding.service.UserService;

@Controller
public class GameController {
	@Autowired
	private GameService gameService;
	@Autowired
	private UserService userService;
	

	@RequestMapping(value = "/api/exercise/getallexercise", method = RequestMethod.GET)
	public @ResponseBody List<ExerciseDTO> getAllExercise(HttpServletRequest request,
			@RequestParam("username") String userName) {
		int userId = userService.getUserId(userName);
		return gameService.getAllExercise(userId);
	}
	
	@RequestMapping(value = "/api/exercise/getexercisebyid", method = RequestMethod.GET)
	public @ResponseBody ExerciseDTO getExerciseById(HttpServletRequest request,
			@RequestParam("exerciseid") int exerciseid){
		
		return gameService.getExerciseById(exerciseid);
	}

}
