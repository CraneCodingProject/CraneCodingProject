package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the case database table.
 * 
 */
@Embeddable
public class CasePK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(unique=true, nullable=false)
	private int idCase;

	@Column(insertable=false, updatable=false, unique=true, nullable=false)
	private int inputType_idInputType;

	@Column(insertable=false, updatable=false, unique=true, nullable=false)
	private int calculation_idCalculation;

	public CasePK() {
	}
	public int getIdCase() {
		return this.idCase;
	}
	public void setIdCase(int idCase) {
		this.idCase = idCase;
	}
	public int getInputType_idInputType() {
		return this.inputType_idInputType;
	}
	public void setInputType_idInputType(int inputType_idInputType) {
		this.inputType_idInputType = inputType_idInputType;
	}
	public int getCalculation_idCalculation() {
		return this.calculation_idCalculation;
	}
	public void setCalculation_idCalculation(int calculation_idCalculation) {
		this.calculation_idCalculation = calculation_idCalculation;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof CasePK)) {
			return false;
		}
		CasePK castOther = (CasePK)other;
		return 
			(this.idCase == castOther.idCase)
			&& (this.inputType_idInputType == castOther.inputType_idInputType)
			&& (this.calculation_idCalculation == castOther.calculation_idCalculation);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.idCase;
		hash = hash * prime + this.inputType_idInputType;
		hash = hash * prime + this.calculation_idCalculation;
		
		return hash;
	}
}