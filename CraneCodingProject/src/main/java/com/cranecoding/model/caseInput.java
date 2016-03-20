package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the case_input database table.
 * 
 */
@Entity
@Table(name="case_input")
@NamedQuery(name="caseInput.findAll", query="SELECT c FROM caseInput c")
public class caseInput implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private caseInputPK id;

	@Column(length=45)
	private String innput;

	@Column(length=45)
	private String output;

	//bi-directional many-to-one association to calculation
	@ManyToOne
	@JoinColumn(name="calculation_idcalculation", nullable=false, insertable=false, updatable=false)
	private calculation calculation;

	//bi-directional many-to-one association to inputtype
	@ManyToOne
	@JoinColumn(name="inputtype_idinputtype", nullable=false, insertable=false, updatable=false)
	private inputtype inputtype;

	public caseInput() {
	}

	public caseInputPK getId() {
		return this.id;
	}

	public void setId(caseInputPK id) {
		this.id = id;
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

	public calculation getCalculation() {
		return this.calculation;
	}

	public void setCalculation(calculation calculation) {
		this.calculation = calculation;
	}

	public inputtype getInputtype() {
		return this.inputtype;
	}

	public void setInputtype(inputtype inputtype) {
		this.inputtype = inputtype;
	}

}