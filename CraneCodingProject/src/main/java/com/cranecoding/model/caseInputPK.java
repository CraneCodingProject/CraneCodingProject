package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the case_input database table.
 * 
 */
@Embeddable
public class caseInputPK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(unique=true, nullable=false)
	private int idcase;

	@Column(name="inputtype_idinputtype", insertable=false, updatable=false, unique=true, nullable=false)
	private int inputtypeIdinputtype;

	@Column(name="calculation_idcalculation", insertable=false, updatable=false, unique=true, nullable=false)
	private int calculationIdcalculation;

	public caseInputPK() {
	}
	public int getIdcase() {
		return this.idcase;
	}
	public void setIdcase(int idcase) {
		this.idcase = idcase;
	}
	public int getInputtypeIdinputtype() {
		return this.inputtypeIdinputtype;
	}
	public void setInputtypeIdinputtype(int inputtypeIdinputtype) {
		this.inputtypeIdinputtype = inputtypeIdinputtype;
	}
	public int getCalculationIdcalculation() {
		return this.calculationIdcalculation;
	}
	public void setCalculationIdcalculation(int calculationIdcalculation) {
		this.calculationIdcalculation = calculationIdcalculation;
	}

	public boolean equals(Object other) {
		if (this == other) {
			return true;
		}
		if (!(other instanceof caseInputPK)) {
			return false;
		}
		caseInputPK castOther = (caseInputPK)other;
		return 
			(this.idcase == castOther.idcase)
			&& (this.inputtypeIdinputtype == castOther.inputtypeIdinputtype)
			&& (this.calculationIdcalculation == castOther.calculationIdcalculation);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.idcase;
		hash = hash * prime + this.inputtypeIdinputtype;
		hash = hash * prime + this.calculationIdcalculation;
		
		return hash;
	}
}