package com.cranecoding.controller;

import java.util.Hashtable;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cranecoding.dto.exercise.ExerciseDTO;
import com.cranecoding.model.TestCase;
import com.cranecoding.service.GameService;
import com.cranecoding.service.UserService;

@Controller
public class GameController {
	@Autowired
	private GameService gameService;
	@Autowired
	private UserService userService;

	@RequestMapping(value = "/api/exercise/getallexercises", method = RequestMethod.GET)
	public @ResponseBody List<ExerciseDTO> getAllExercise(HttpServletRequest request,
			@RequestParam("username") String userName) {
		int userId = userService.getUserId(userName);
		return gameService.getAllExercise(userId);
	}

	@RequestMapping(value = "/api/exercise/getexercisesById", method = RequestMethod.GET)
	public @ResponseBody ExerciseDTO getExerciseById(HttpServletRequest request,
			@RequestParam("exerciseId") int exerciseid) {

		return gameService.getExerciseById(exerciseid);
	}

	@RequestMapping(value = "/api/exercise/gettestcases", method = RequestMethod.GET)
	public @ResponseBody List<TestCase> getTestCase(HttpServletRequest request,
			@RequestParam("exerciseid") int exerciseid) {
		return gameService.getTestCaseByExerciseId(exerciseid);
	}

	@RequestMapping(value = "/api/exercise/submit", method = RequestMethod.GET)
	public @ResponseBody Hashtable<String, Comparable> submitExercise(HttpServletRequest request,
			@RequestParam("exerciseid") int exerciseid, @RequestParam("username") String username,
			@RequestParam("star") int star, @RequestParam("time") String time) {
		Hashtable informationToReturn = new Hashtable();
		if (star > 5) {
			gameService.saveScore(exerciseid,username,star,time);
			informationToReturn.put("result", true);
			informationToReturn.put("exerciseId", gameService.openNextExercise(exerciseid + 1, username));
		} else {
			informationToReturn.put("result", false);
			informationToReturn.put("message", "Sorry, you fail! Please try again!");
		}
		return informationToReturn;
	}
	@RequestMapping(value = "/api/exercise/testcode", method = RequestMethod.GET)
	public @ResponseBody String testCode(HttpServletRequest request, 
			@RequestParam("exerciseid") int exerciseid, @RequestParam("param") String param) {
		
		return gameService.returnBaseOnExIdAndParam(exerciseid, param);
	}

	@RequestMapping(value = "/api/exercise/record", method = RequestMethod.GET)
	public @ResponseBody Hashtable record(@RequestParam("username")String userName){
		int userId = gameService.getUserIdByUserName(userName);
		return gameService.getRecordByUserId(userId);
	}

	@RequestMapping(value = "/api/exercise/hint", method = RequestMethod.GET)
	public @ResponseBody Hashtable<String, Comparable> hintImg(@RequestParam("exerciseid")int exerciseid){
		//return gameService.getRecordByUserId(userId);
		System.out.println("exerciseid:"+exerciseid);
		Hashtable informationToReturn = new Hashtable();
		informationToReturn.put("result","http://thuvienanhdep.net/wp-content/uploads/2015/09/bo-suu-tap-nhung-hinh-anh-de-thuong-dang-yeu-cua-hot-girl-anh-the-14.jpg");
		informationToReturn.put("message",":))");
		return informationToReturn;
	}
	
}
