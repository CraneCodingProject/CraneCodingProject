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
@NamedQuery(name="calculation.findAll", query="SELECT c FROM calculation c")
public class calculation implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(unique=true, nullable=false)
	private int idcalculation;

	@Column
	private String answer;

	@Column(length=45)
	private String calculationname;

	@Column
	private String pseudocode;

	@Column(length=300)
	private String question;

	//bi-directional many-to-one association to caseInput
	@OneToMany(mappedBy="calculation")
	private List<caseInput> caseInputs;

	//bi-directional many-to-one association to score
	@OneToMany(mappedBy="calculation")
	private List<score> scores;

	public calculation() {
	}

	public int getIdcalculation() {
		return this.idcalculation;
	}

	public void setIdcalculation(int idcalculation) {
		this.idcalculation = idcalculation;
	}

	public String getAnswer() {
		return this.answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public String getCalculationname() {
		return this.calculationname;
	}

	public void setCalculationname(String calculationname) {
		this.calculationname = calculationname;
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

	public List<caseInput> getCaseInputs() {
		return this.caseInputs;
	}

	public void setCaseInputs(List<caseInput> caseInputs) {
		this.caseInputs = caseInputs;
	}

	public caseInput addCaseInput(caseInput caseInput) {
		getCaseInputs().add(caseInput);
		caseInput.setCalculation(this);

		return caseInput;
	}

	public caseInput removeCaseInput(caseInput caseInput) {
		getCaseInputs().remove(caseInput);
		caseInput.setCalculation(null);

		return caseInput;
	}

	public List<score> getScores() {
		return this.scores;
	}

	public void setScores(List<score> scores) {
		this.scores = scores;
	}

	public score addScore(score score) {
		getScores().add(score);
		score.setCalculation(this);

		return score;
	}

	public score removeScore(score score) {
		getScores().remove(score);
		score.setCalculation(null);

		return score;
	}

}