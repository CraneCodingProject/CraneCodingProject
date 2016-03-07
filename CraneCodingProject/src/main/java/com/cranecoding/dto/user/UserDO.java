package com.cranecoding.dto.user;

//import java.io.Serializable;
//import java.util.Set;
//
//import javax.persistence.CascadeType;
//import javax.persistence.Column;
//import javax.persistence.Entity;
//import javax.persistence.FetchType;
//import javax.persistence.GeneratedValue;
//import javax.persistence.GenerationType;
//import javax.persistence.Id;
//import javax.persistence.OneToMany;
//import javax.persistence.Table;
//import javax.persistence.Temporal;
//import javax.persistence.TemporalType;
//
//import com.cranecoding.dto.score.ScoreDO;
//
//
//@Entity
//@Table(name = "user")
public class UserDO {//implements Serializable{
//	private static final long serialVersionUID = 1L;
//
//	@Id
//	@Column(name = "Username")
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private String username;
//	
//	@Temporal(TemporalType.TIMESTAMP)
//	@Column(name = "Password", nullable = false, columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
//	private String password;
//	
//	@Column(name = "FirstName", nullable = true)
//	private String firstName;
//
//	@Column(name = "LastName", nullable = false)
//	private String lastName;
//
//	@Column(name = "Email", nullable = true)
//	private String email;
//	
//	@Column(name = "FakeMoney", nullable = true)
//	private int fakeMoney;
//
//	@Column(name = "FacebookID", nullable = false)
//	private String facebookID;
//	
//	@OneToMany(mappedBy = "Username", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
//	private Set<ScoreDO> scoreDO;
//
//	public UserDO() {
//	}
//
//	public String getUsername() {
//		return username;
//	}
//
//	public void setUsername(String username) {
//		this.username = username;
//	}
//
//	public String getPassword() {
//		return password;
//	}
//
//	public void setPassword(String password) {
//		this.password = password;
//	}
//
//	public String getFirstName() {
//		return firstName;
//	}
//
//	public void setFirstName(String firstName) {
//		this.firstName = firstName;
//	}
//
//	public String getLastName() {
//		return lastName;
//	}
//
//	public void setLastName(String lastName) {
//		this.lastName = lastName;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	public int getFakeMoney() {
//		return fakeMoney;
//	}
//
//	public void setFakeMoney(int fakeMoney) {
//		this.fakeMoney = fakeMoney;
//	}
//
//	public String getFacebookID() {
//		return facebookID;
//	}
//
//	public void setFacebookID(String facebookID) {
//		this.facebookID = facebookID;
//	}
//
//	public Set<ScoreDO> getScoreDO() {
//		return scoreDO;
//	}
//
//	public void setScoreDO(Set<ScoreDO> scoreDO) {
//		this.scoreDO = scoreDO;
//	}
	
}
