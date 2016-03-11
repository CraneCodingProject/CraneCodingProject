package com.cranecoding.model;

import java.io.Serializable;
import javax.persistence.*;
import java.util.List;


/**
 * The persistent class for the user database table.
 * 
 */
@Entity
@Table(name="user")
@NamedQuery(name="User.findAll", query="SELECT u FROM User u")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(unique=true, nullable=false, length=45)
	private String username;

	@Column(length=45)
	private String email;

	@Column(length=50)
	private String facebookID;

	private int fakeMoney;

	@Column(length=30)
	private String firstname;

	@Column(length=30)
	private String lastname;

	@Column(length=45)
	private String password;

	//bi-directional many-to-one association to Score
	@OneToMany(mappedBy="user")
	private List<Score> scores;

	public User() {
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFacebookID() {
		return this.facebookID;
	}

	public void setFacebookID(String facebookID) {
		this.facebookID = facebookID;
	}

	public int getFakeMoney() {
		return this.fakeMoney;
	}

	public void setFakeMoney(int fakeMoney) {
		this.fakeMoney = fakeMoney;
	}

	public String getFirstname() {
		return this.firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return this.lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<Score> getScores() {
		return this.scores;
	}

	public void setScores(List<Score> scores) {
		this.scores = scores;
	}

	public Score addScore(Score score) {
		getScores().add(score);
		score.setUser(this);

		return score;
	}

	public Score removeScore(Score score) {
		getScores().remove(score);
		score.setUser(null);

		return score;
	}

}