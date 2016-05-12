package com.cranecoding.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cranecoding.dto.exercise.ExerciseDTO;
import com.cranecoding.model.Exercise;
import com.cranecoding.service.AdminService;

@Controller
public class AdminController {
	
	@Autowired
	AdminService adminService;
	
	@RequestMapping(value = "/api/admin/createOrUpdate", method = RequestMethod.POST)
	public @ResponseBody boolean createExercise(@RequestBody ExerciseDTO exerciseInfo){
		try{
			String exId = String.valueOf(exerciseInfo.getIdExercise());
			return adminService.updateExercise(exerciseInfo);
		}
		catch(Exception E){
			return adminService.createExercise(exerciseInfo);
		}
	}
	//chua lam dc
	@RequestMapping(value = "/api/admin/delete", method = RequestMethod.GET)
	public @ResponseBody boolean deleteExercise(@RequestParam("exerciseid") int exerciseId){
		return adminService.deleteExercise(exerciseId);
	}
	
	private ExerciseDTO convertToExerciseDTO(Exercise exercise) {
		ExerciseDTO exerciseDto = new ExerciseDTO(exercise.getExerciseid(), exercise.getExercisename(),
				exercise.getExercisecontent(), exercise.getExerciseanswer(), exercise.getPseudocode());
		return exerciseDto;
	}

	@RequestMapping(value = "/api/admin/getAllExercise", method = RequestMethod.GET)
	public @ResponseBody List<ExerciseDTO> getAllExercise(){
		List<Exercise> exerToProcess = adminService.getAllExercise();
		List<ExerciseDTO> listExerciseDTOs = new ArrayList<>();
		for (Exercise exercise : exerToProcess) {
			listExerciseDTOs.add(convertToExerciseDTO(exercise));
		}
		return listExerciseDTOs;
	}
	
}
