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

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(unique=true, nullable=false)
	private int scoreid;

	@Lob
	private String block;

	private int star;

	private int status;

	private int time;

	//bi-directional many-to-one association to Exercise
	@ManyToOne
	@JoinColumn(name="exercise_exerciseid", nullable=false)
	private Exercise exercise;

	//bi-directional many-to-one association to User
	@ManyToOne
	@JoinColumn(name="user_userid", nullable=false)
	private User user;

	public Score() {
	}

	public int getScoreid() {
		return this.scoreid;
	}

	public void setScoreid(int scoreid) {
		this.scoreid = scoreid;
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

	public Exercise getExercise() {
		return this.exercise;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}