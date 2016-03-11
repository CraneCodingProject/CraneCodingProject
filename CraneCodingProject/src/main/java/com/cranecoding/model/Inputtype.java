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
@NamedQuery(name="Inputtype.findAll", query="SELECT i FROM Inputtype i")
public class Inputtype implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(unique=true, nullable=false)
	private int idInputType;

	@Column(length=30)
	private String inputTypeName;

	//bi-directional many-to-one association to Case
	@OneToMany(mappedBy="inputtype")
	private List<Case> cases;

	public Inputtype() {
	}

	public int getIdInputType() {
		return this.idInputType;
	}

	public void setIdInputType(int idInputType) {
		this.idInputType = idInputType;
	}

	public String getInputTypeName() {
		return this.inputTypeName;
	}

	public void setInputTypeName(String inputTypeName) {
		this.inputTypeName = inputTypeName;
	}

	public List<Case> getCases() {
		return this.cases;
	}

	public void setCases(List<Case> cases) {
		this.cases = cases;
	}

	public Case addCas(Case cas) {
		getCases().add(cas);
		cas.setInputtype(this);

		return cas;
	}

	public Case removeCas(Case cas) {
		getCases().remove(cas);
		cas.setInputtype(null);

		return cas;
	}

}