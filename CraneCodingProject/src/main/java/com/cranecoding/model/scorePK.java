package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the score database table.
 * 
 */
@Embeddable
public class scorePK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(name="user_username", insertable=false, updatable=false, unique=true, nullable=false, length=45)
	private String userUsername;

	@Column(name="calculation_idcalculation", insertable=false, updatable=false, unique=true, nullable=false)
	private int calculationIdcalculation;

	public scorePK() {
	}
	public String getUserUsername() {
		return this.userUsername;
	}
	public void setUserUsername(String userUsername) {
		this.userUsername = userUsername;
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
		if (!(other instanceof scorePK)) {
			return false;
		}
		scorePK castOther = (scorePK)other;
		return 
			this.userUsername.equals(castOther.userUsername)
			&& (this.calculationIdcalculation == castOther.calculationIdcalculation);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.userUsername.hashCode();
		hash = hash * prime + this.calculationIdcalculation;
		
		return hash;
	}
}