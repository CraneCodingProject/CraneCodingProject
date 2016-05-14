package com.cranecoding.controller;

import java.util.ArrayList;
import java.util.List;

import org.hornetq.utils.json.JSONException;
import org.hornetq.utils.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cranecoding.dto.exercise.ExerciseDAO;
import com.cranecoding.dto.exercise.ExerciseDTO;
import com.cranecoding.dto.exercise.wrapper;
import com.cranecoding.dto.testcase.TestCaseDAO;
import com.cranecoding.dto.testcase.TestCaseDTO;
import com.cranecoding.model.Exercise;
import com.cranecoding.model.TestCase;
import com.cranecoding.service.AdminService;

@Controller
public class AdminController {

	@Autowired
	AdminService adminService;

	@Autowired
	ExerciseDAO exerciseDao;

	@Autowired
	TestCaseDAO testcaseDao;

	@RequestMapping(value = "/api/admin/createOrUpdate", method = RequestMethod.POST)
	public @ResponseBody boolean createExercise(@RequestBody ExerciseDTO exerciseInfo) throws JSONException {
		System.out.println("SASAS");
		try{
			//ta get dc rồi á nghe. tụi m làm tiếp cái insert testcase vào. tối ni có.
			String exId = String.valueOf(exerciseInfo.getIdExercise());
			List <TestCaseDTO> lst = exerciseInfo.getExerciseTestCases();
			for(int i =0; i < lst.size() ; i++){
				System.out.println("abc "+lst.get(i).getInput());
			}
			return adminService.updateExercise(exerciseInfo);
		}
		catch(Exception E){
			return adminService.createExercise(exerciseInfo);
		}
	}

	private TestCaseDTO converToTestCaseDTO(Object objs) {
		return null;
	}

	// chua lam dc
	@RequestMapping(value = "/api/admin/delete", method = RequestMethod.GET)
	public @ResponseBody boolean deleteExercise(@RequestParam("exerciseid") int exerciseId) {
		return adminService.deleteExercise(exerciseId);
	}

	private ExerciseDTO convertToExerciseDTO(Exercise exercise) {
		ExerciseDTO exerciseDto = new ExerciseDTO(exercise.getExerciseid(), exercise.getExercisename(),
				exercise.getExercisecontent(), exercise.getExerciseanswer(), exercise.getPseudocode());
		return exerciseDto;
	}

	@RequestMapping(value = "/api/admin/getAllExercise", method = RequestMethod.GET)
	public @ResponseBody List<ExerciseDTO> getAllExercise() {
		List<Exercise> exerToProcess = adminService.getAllExercise();
		List<ExerciseDTO> listExerciseDTOs = new ArrayList<>();
		for (Exercise exercise : exerToProcess) {
			listExerciseDTOs.add(convertToExerciseDTO(exercise));
		}
		return listExerciseDTOs;
	}

}
