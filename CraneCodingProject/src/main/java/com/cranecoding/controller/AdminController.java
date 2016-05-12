package com.cranecoding.controller;

import java.util.ArrayList;
import java.util.List;

import org.neo4j.cypher.internal.compiler.v2_1.perty.docbuilders.toStringDocBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
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
	public @ResponseBody boolean createExercise(@RequestParam ExerciseDTO exerciseInfo){
		String exId = String.valueOf(exerciseInfo.getIdExercise());
		if(exId == null){
			return adminService.createExercise(exerciseInfo);
		}else{
			return adminService.updateExercise(exerciseInfo);
		}
	}
	
	@RequestMapping(value = "/api/admin/delete", method = RequestMethod.GET)
	public @ResponseBody boolean deleteExercise(@RequestParam int exerciseId){
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
