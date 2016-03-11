package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;

/**
 * The primary key class for the score database table.
 * 
 */
@Embeddable
public class ScorePK implements Serializable {
	//default serial version id, required for serializable classes.
	private static final long serialVersionUID = 1L;

	@Column(insertable=false, updatable=false, unique=true, nullable=false, length=45)
	private String user_Username;

	@Column(insertable=false, updatable=false, unique=true, nullable=false)
	private int calculation_idCalculation;

	public ScorePK() {
	}
	public String getUser_Username() {
		return this.user_Username;
	}
	public void setUser_Username(String user_Username) {
		this.user_Username = user_Username;
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
		if (!(other instanceof ScorePK)) {
			return false;
		}
		ScorePK castOther = (ScorePK)other;
		return 
			this.user_Username.equals(castOther.user_Username)
			&& (this.calculation_idCalculation == castOther.calculation_idCalculation);
	}

	public int hashCode() {
		final int prime = 31;
		int hash = 17;
		hash = hash * prime + this.user_Username.hashCode();
		hash = hash * prime + this.calculation_idCalculation;
		
		return hash;
	}
}