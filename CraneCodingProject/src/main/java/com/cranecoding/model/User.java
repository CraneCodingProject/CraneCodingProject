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
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(unique=true, nullable=false)
	private int userid;

	@Column(length=45)
	private String email;

	@Column(length=50)
	private String facebookid;

	private int fakemoney;

	@Column(length=30)
	private String firstname;

	@Column(length=30)
	private String lastname;

	@Column(length=45)
	private String password;

	@Column(length=45)
	private String username;

	//bi-directional many-to-one association to Score
	@OneToMany(mappedBy="user")
	private List<Score> scores;

	public User() {
	}

	public int getUserid() {
		return this.userid;
	}

	public void setUserid(int userid) {
		this.userid = userid;
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFacebookid() {
		return this.facebookid;
	}

	public void setFacebookid(String facebookid) {
		this.facebookid = facebookid;
	}

	public int getFakemoney() {
		return this.fakemoney;
	}

	public void setFakemoney(int fakemoney) {
		this.fakemoney = fakemoney;
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

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
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