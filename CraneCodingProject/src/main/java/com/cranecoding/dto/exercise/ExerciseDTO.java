package com.cranecoding.dto.exercise;

public class ExerciseDTO {
	private int idExercise;
	private String exerciseName;
	private String pseudocode;
	private String question;

	public ExerciseDTO(int idExcercise, String exerciseName, String pseudocode, String question) {
		super();
		this.idExercise = idExcercise;
		this.exerciseName = exerciseName;
		this.pseudocode = pseudocode;
		this.question = question;
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

	public String getPseudocode() {
		return pseudocode;
	}

	public void setPseudocode(String pseudocode) {
		this.pseudocode = pseudocode;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}
}
