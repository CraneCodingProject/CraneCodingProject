package com.cranecoding.dto.exercise;

public class ExerciseDTO {
	private int idExercise;
	private String exerciseName;
	private String exerciseContent;
	private String exerciseAnswer;

	public String getExerciseAnswer() {
		return exerciseAnswer;
	}

	public void setExerciseAnswer(String exerciseAnswer) {
		this.exerciseAnswer = exerciseAnswer;
	}

	public ExerciseDTO(int idExcercise, String exerciseName, String exerciseContent, String exerciseAnswer) {
		super();
		this.idExercise = idExcercise;
		this.exerciseName = exerciseName;
		this.exerciseContent = exerciseContent;
		this.exerciseAnswer = exerciseAnswer;
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
