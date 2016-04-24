package com.cranecoding.dto.user;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.cranecoding.model.Exercise;
import com.cranecoding.model.User;

public interface UserDAO extends CrudRepository<User, Integer> {
	
	@Query (value = "select * from user where username = :username and password = :password", nativeQuery = true)
	User getUserByUserNamePass(@Param("username") String username,@Param("password") String pass);

	@Query(value = "select * from user where username = :username", nativeQuery=true)
	User getUserIdByUserName(@Param("username") String username);
}
