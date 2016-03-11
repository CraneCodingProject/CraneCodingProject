package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the calculation database table.
 * 
 */
@Entity
@Table(name="calculation")
@NamedQuery(name="Calculation.findAll", query="SELECT c FROM Calculation c")
public class Calculation implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(unique=true, nullable=false)
	private int idCalculation;

	@Lob
	private String answer;

	@Column(length=45)
	private String calculationName;

	@Lob
	private String pseudocode;

	@Column(length=300)
	private String question;

	//bi-directional many-to-one association to Case
	@OneToMany(mappedBy="calculation")
	private List<Case> cases;

	//bi-directional many-to-one association to Score
	@OneToMany(mappedBy="calculation")
	private List<Score> scores;

	public Calculation() {
	}

	public int getIdCalculation() {
		return this.idCalculation;
	}

	public void setIdCalculation(int idCalculation) {
		this.idCalculation = idCalculation;
	}

	public String getAnswer() {
		return this.answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getCalculationName() {
		return this.calculationName;
	}

	public void setCalculationName(String calculationName) {
		this.calculationName = calculationName;
	}

	public String getPseudocode() {
		return this.pseudocode;
	}

	public void setPseudocode(String pseudocode) {
		this.pseudocode = pseudocode;
	}

	public String getQuestion() {
		return this.question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public List<Case> getCases() {
		return this.cases;
	}

	public void setCases(List<Case> cases) {
		this.cases = cases;
	}

	public Case addCas(Case cas) {
		getCases().add(cas);
		cas.setCalculation(this);

		return cas;
	}

	public Case removeCas(Case cas) {
		getCases().remove(cas);
		cas.setCalculation(null);

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
		score.setCalculation(this);

		return score;
	}

	public Score removeScore(Score score) {
		getScores().remove(score);
		score.setCalculation(null);

		return score;
	}

}