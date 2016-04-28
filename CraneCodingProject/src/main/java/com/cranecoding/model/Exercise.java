package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the exercise database table.
 * 
 */
@Entity
@Table(name="exercise")
@NamedQuery(name="Exercise.findAll", query="SELECT e FROM Exercise e")
public class Exercise implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(unique=true, nullable=false)
	private int exerciseid;

	@Lob
	private String exerciseanswer;

	@Column(length=300)
	private String exercisecontent;

	@Column(length=45)
	private String exercisename;

	@Lob
	private String pseudocode;

	//bi-directional many-to-one association to Case
	@OneToMany(mappedBy="exercise")
	private List<Case> cases;

	//bi-directional many-to-one association to Score
	@OneToMany(mappedBy="exercise")
	private List<Score> scores;

	public Exercise() {
	}

	public int getExerciseid() {
		return this.exerciseid;
	}

	public void setExerciseid(int exerciseid) {
		this.exerciseid = exerciseid;
	}

	public String getExerciseanswer() {
		return this.exerciseanswer;
	}

	public void setExerciseanswer(String exerciseanswer) {
		this.exerciseanswer = exerciseanswer;
	}

	public String getExercisecontent() {
		return this.exercisecontent;
	}

	public void setExercisecontent(String exercisecontent) {
		this.exercisecontent = exercisecontent;
	}

	public String getExercisename() {
		return this.exercisename;
	}

	public void setExercisename(String exercisename) {
		this.exercisename = exercisename;
	}

	public String getPseudocode() {
		return this.pseudocode;
	}

	public void setPseudocode(String pseudocode) {
		this.pseudocode = pseudocode;
	}

	public List<Case> getCases() {
		return this.cases;
	}

	public void setCases(List<Case> cases) {
		this.cases = cases;
	}

	public Case addCas(Case cas) {
		getCases().add(cas);
		cas.setExercise(this);

		return cas;
	}

	public Case removeCas(Case cas) {
		getCases().remove(cas);
		cas.setExercise(null);

		return cas;
	}

	public List<Score> getScores() {
		return this.scores;
	}

	public void setScores(List<Score> scores) {
		this.scores = scores;
	}

	public Score addScore(Score score) {
		getScores().add(score);
		score.setExercise(this);

		return score;
	}

	public Score removeScore(Score score) {
		getScores().remove(score);
		score.setExercise(null);

		return score;
	}

}