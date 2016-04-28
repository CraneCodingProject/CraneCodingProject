package com.cranecoding.serviceImp;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cranecoding.dto.exercise.ExerciseDAO;
import com.cranecoding.dto.exercise.ExerciseDTO;
import com.cranecoding.dto.score.ScoreDAO;
import com.cranecoding.dto.user.UserDAO;
import com.cranecoding.model.Exercise;
import com.cranecoding.model.Score;
import com.cranecoding.service.GameService;

@Service
public class GameServiceImp implements GameService {

	@Autowired
	ExerciseDAO exerciseDAO;
	
	@Autowired
	UserDAO userDAO;
	
	@Autowired
	ScoreDAO scoreDAO;

	@Override
	public List<ExerciseDTO> getAllExercise(int userId) {
		List<ExerciseDTO> listExerciseDTOs = new ArrayList<>();
		for (Exercise exercise : exerciseDAO.getAllExerciseByUserId(userId)) {
			listExerciseDTOs.add(convertToExerciseDTO(exercise));
		}
		return listExerciseDTOs;
	}

	@Override
	public ExerciseDTO getExerciseById(int exerciseid) {
		return convertToExerciseDTO(exerciseDAO.getExerciseById(exerciseid));
	}

	private ExerciseDTO convertToExerciseDTO(Exercise exercise) {
		ExerciseDTO exerciseDto = new ExerciseDTO(exercise.getExerciseid(), exercise.getExercisename(),
				exercise.getExercisecontent());
		return exerciseDto;
	}

	@Override
	public void openExerciseNewUser(int userId) {
			Exercise exercise = exerciseDAO.getExerciseById(22);
			Score score = new Score();
			score.setUser(userDAO.getUserById(userId));
			score.setExercise(exercise);
			score.setTime(0);
			score.setStatus(0);
			score.setBlock("");
			score.setStar(0);
			scoreDAO.save(score);
	}
}
