package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;


/**
 * The persistent class for the score database table.
 * 
 */
@Entity
@Table(name="score")
@NamedQuery(name="Score.findAll", query="SELECT s FROM Score s")
public class Score implements Serializable {
	private static final long serialVersionUID = 1L;

	@EmbeddedId
	private ScorePK id;

	@Lob
	private String block;

	private int star;

	private int status;

	private int time;

	//bi-directional many-to-one association to Calculation
	@ManyToOne
	@JoinColumn(name="Calculation_idCalculation", nullable=false, insertable=false, updatable=false)
	private Calculation calculation;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="User_Username", nullable=false, insertable=false, updatable=false)
	private User user;

	public Score() {
	}

	public ScorePK getId() {
		return this.id;
	}

	public void setId(ScorePK id) {
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

	public Calculation getCalculation() {
		return this.calculation;
	}

	public void setCalculation(Calculation calculation) {
		this.calculation = calculation;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}