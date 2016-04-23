package com.cranecoding.dto.exercise;

public class ExerciseDTO {
	private int idExercise;
	private String exerciseName;
	private String exerciseContent;

	public ExerciseDTO(int idExcercise, String exerciseName, String exerciseContent) {
		super();
		this.idExercise = idExcercise;
		this.exerciseName = exerciseName;
		this.exerciseContent = exerciseContent;
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
