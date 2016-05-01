package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the test_case database table.
 * 
 */
@Entity
@Table(name="test_case")
@NamedQuery(name="TestCase.findAll", query="SELECT t FROM TestCase t")
public class TestCase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(unique=true, nullable=false)
	private int idcase;

	@Column(length=45)
	private String innput;

	@Column(length=45)
	private String output;

	//bi-directional many-to-one association to Exercise
	@ManyToOne
	@JoinColumn(name="exercise_exerciseid", nullable=false)
	private Exercise exercise;

	public TestCase() {
	}

	public int getIdcase() {
		return this.idcase;
	}

	public void setIdcase(int idcase) {
		this.idcase = idcase;
	}

	public String getInnput() {
		return this.innput;
	}

	public void setInnput(String innput) {
		this.innput = innput;
	}

	public String getOutput() {
		return this.output;
	}

	public void setOutput(String output) {
		this.output = output;
	}

	public Exercise getExercise() {
		return this.exercise;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}

}