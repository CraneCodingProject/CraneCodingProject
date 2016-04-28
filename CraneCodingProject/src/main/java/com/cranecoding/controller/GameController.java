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
	

	@RequestMapping(value = "/api/exercise/getallexercises", method = RequestMethod.GET)
	public @ResponseBody List<ExerciseDTO> getAllExercise(HttpServletRequest request,
			@RequestParam("username") String userName) {
		int userId = userService.getUserId(userName);
		return gameService.getAllExercise(userId);
	}
	
	@RequestMapping(value = "/api/exercise/getexercisesById", method = RequestMethod.GET)
	public @ResponseBody ExerciseDTO getExerciseById(HttpServletRequest request,
			@RequestParam("exerciseId") int exerciseid){
		
		return gameService.getExerciseById(exerciseid);
	}
	
	// mới lấy exercise truyền parameter để ấn test.
		@RequestMapping(value = "/api/exercise/testcode", method = RequestMethod.GET)
		public @ResponseBody int testcode(@RequestParam("parameter") String parameter, @RequestParam("exerciseid") String exerciseId){
			//System.out.println("__B__"+exerciseid);
			//System.out.println("__B__"+parameter);
			System.out.println("__B__"+exerciseId);
			if(Integer.parseInt( exerciseId ) == 1) return tinhtong(Integer.parseInt( parameter ));
			return 1;
			
		}
//		@RequestMapping(value = "/api/exercise/submitcode",method = RequestMethod.GET)
//		public @ResponseBody 

		
		
		public int tinhtong(int n){
			int S = 0;
			for ( int i = 0; i < n ; i++ ){
				S = S + i ;
			}
			return S;
		}

}
