package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the inputtype database table.
 * 
 */
@Entity
@Table(name="inputtype")
@NamedQuery(name="inputtype.findAll", query="SELECT i FROM inputtype i")
public class inputtype implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(unique=true, nullable=false)
	private int idinputtype;

	@Column(length=30)
	private String inputtypename;

	//bi-directional many-to-one association to caseInput
	@OneToMany(mappedBy="inputtype")
	private List<caseInput> caseInputs;

	public inputtype() {
	}

	public int getIdinputtype() {
		return this.idinputtype;
	}

	public void setIdinputtype(int idinputtype) {
		this.idinputtype = idinputtype;
	}

	public String getInputtypename() {
		return this.inputtypename;
	}

	public void setInputtypename(String inputtypename) {
		this.inputtypename = inputtypename;
	}

	public List<caseInput> getCaseInputs() {
		return this.caseInputs;
	}

	public void setCaseInputs(List<caseInput> caseInputs) {
		this.caseInputs = caseInputs;
	}

	public caseInput addCaseInput(caseInput caseInput) {
		getCaseInputs().add(caseInput);
		caseInput.setInputtype(this);

		return caseInput;
	}

	public caseInput removeCaseInput(caseInput caseInput) {
		getCaseInputs().remove(caseInput);
		caseInput.setInputtype(null);

		return caseInput;
	}

}