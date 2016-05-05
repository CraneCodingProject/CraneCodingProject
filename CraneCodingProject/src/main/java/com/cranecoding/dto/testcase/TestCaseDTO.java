package com.cranecoding.dto.testcase;

public class TestCaseDTO {
	private String input;
	private String output;
	private int exerciseId;

	public TestCaseDTO(String input, String output, int exerciseId) {
		super();
		this.input = input;
		this.output = output;
		this.exerciseId = exerciseId;
	}

	public String getInput() {
		return input;
	}

	public void setInput(String input) {
		this.input = input;
	}

	public String getOutput() {
		return output;
	}

	public void setOutput(String output) {
		this.output = output;
	}

	public int getExerciseId() {
		return exerciseId;
	}

	public void setExerciseId(int exerciseId) {
		this.exerciseId = exerciseId;
	}

}
