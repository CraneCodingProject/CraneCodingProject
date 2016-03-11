package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the case database table.
 * 
 */
@Entity
@Table(name="case")
@NamedQuery(name="Case.findAll", query="SELECT c FROM Case c")
public class Case implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private CasePK id;

	@Column(length=45)
	private String innput;

	@Column(length=45)
	private String output;

	//bi-directional many-to-one association to Calculation
	@ManyToOne
	@JoinColumn(name="Calculation_idCalculation", nullable=false, insertable=false, updatable=false)
	private Calculation calculation;

	//bi-directional many-to-one association to Inputtype
	@ManyToOne
	@JoinColumn(name="InputType_idInputType", nullable=false, insertable=false, updatable=false)
	private Inputtype inputtype;

	public Case() {
	}

	public CasePK getId() {
		return this.id;
	}

	public void setId(CasePK id) {
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

	public Calculation getCalculation() {
		return this.calculation;
	}

	public void setCalculation(Calculation calculation) {
		this.calculation = calculation;
	}

	public Inputtype getInputtype() {
		return this.inputtype;
	}

	public void setInputtype(Inputtype inputtype) {
		this.inputtype = inputtype;
	}

}