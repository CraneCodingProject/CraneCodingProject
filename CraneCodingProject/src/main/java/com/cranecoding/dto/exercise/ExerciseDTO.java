package com.cranecoding.dto.exercise;

import java.util.ArrayList;
import java.util.List;

import com.cranecoding.dto.testcase.TestCaseDTO;

public class ExerciseDTO {
	private int idExercise;
	private String exerciseName;
	private String exerciseContent;
	private String exerciseAnswer;
	private String pseudoCode;
	private List<TestCaseDTO> exerciseTestCases ;

	public List<TestCaseDTO> getExerciseTestCases() {
		return exerciseTestCases;
	}

	public void setExerciseTestCases(List<TestCaseDTO> exerciseTestCases) {
		this.exerciseTestCases = exerciseTestCases;
	}

	public String getPseudoCode() {
		return pseudoCode;
	}

	public void setPseudoCode(String pseudoCode) {
		this.pseudoCode = pseudoCode;
	}

	public String getExerciseAnswer() {
		return exerciseAnswer;
	}

	public void setExerciseAnswer(String exerciseAnswer) {
		this.exerciseAnswer = exerciseAnswer;
	}

	public ExerciseDTO() {

	}

	public ExerciseDTO(int idExcercise, String exerciseName, String exerciseContent, String exerciseAnswer,
			String pseudoCode) {
		this.idExercise = idExcercise;
		this.exerciseName = exerciseName;
		this.exerciseContent = exerciseContent;
		this.exerciseAnswer = exerciseAnswer;
		this.pseudoCode = pseudoCode;
	}
	public ExerciseDTO(int idExcercise, String exerciseName, String exerciseContent, String exerciseAnswer,
			String pseudoCode,List<TestCaseDTO> ax ) {
		this.idExercise = idExcercise;
		this.exerciseName = exerciseName;
		this.exerciseContent = exerciseContent;
		this.exerciseAnswer = exerciseAnswer;
		this.pseudoCode = pseudoCode;
		this.exerciseTestCases = ax;
	}

	public int getIdExercise() {
		return idExercise;
	}

	public void setIdExercise(int idExercise) {
		this.idExercise = idExercise;
	}

	public String getExerciseName() {
		return exerciseName;
	}

	public void setExerciseName(String exerciseName) {
		this.exerciseName = exerciseName;
	}

	public String getExerciseContent() {
		return exerciseContent;
	}

	public void setExerciseContent(String exerciseContent) {
		this.exerciseContent = exerciseContent;
	}

}
