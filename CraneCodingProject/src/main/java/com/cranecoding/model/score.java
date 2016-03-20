package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the score database table.
 * 
 */
@Entity
@Table(name="score")
@NamedQuery(name="score.findAll", query="SELECT s FROM score s")
public class score implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private scorePK id;

	@Lob
	private String block;

	private int star;

	private int status;

	private int time;

	//bi-directional many-to-one association to calculation
	@ManyToOne
	@JoinColumn(name="calculation_idcalculation", nullable=false, insertable=false, updatable=false)
	private calculation calculation;

	//bi-directional many-to-one association to user
	@ManyToOne
	@JoinColumn(name="user_username", nullable=false, insertable=false, updatable=false)
	private user user;

	public score() {
	}

	public scorePK getId() {
		return this.id;
	}

	public void setId(scorePK id) {
		this.id = id;
	}

	public String getBlock() {
		return this.block;
	}

	public void setBlock(String block) {
		this.block = block;
	}

	public int getStar() {
		return this.star;
	}

	public void setStar(int star) {
		this.star = star;
	}

	public int getStatus() {
		return this.status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public int getTime() {
		return this.time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public calculation getCalculation() {
		return this.calculation;
	}

	public void setCalculation(calculation calculation) {
		this.calculation = calculation;
	}

	public user getUser() {
		return this.user;
	}

	public void setUser(user user) {
		this.user = user;
	}

}