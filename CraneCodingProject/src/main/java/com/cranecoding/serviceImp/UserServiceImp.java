package com.cranecoding.serviceImp;

import java.io.IOException;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cranecoding.dto.user.UserDAO;
import com.cranecoding.dto.user.UserDTO;
import com.cranecoding.model.User;
import com.cranecoding.service.UserService;

@Service
public class UserServiceImp implements UserService {

	@Autowired
	UserDAO userDao;

	@Override
	public boolean checkIfValidUser(String jsonUserInfor) throws JsonParseException, JsonMappingException, IOException {
		ObjectMapper objectMapper = new ObjectMapper();

		UserDTO user = objectMapper.readValue(jsonUserInfor, UserDTO.class);
		System.out.println(user.getUsername());
		System.out.println(user.getPassword());
		if (userDao.getUserByUserNamePass(user.getUsername(), user.getPassword()) == null)
			return false;
		return true;
	}

	@Override
	public int getUserId(String username) {
		return userDao.getUserIdByUserName(username).getUserid();
	}

	@Override
	public boolean checkIsUserNameExsit(UserDTO userRegister) {
		if (userDao.getUserListByUserNameAndEmail(userRegister.getUsername(), userRegister.getUsermail()).isEmpty()) {
			return true;
		}
		return false;
	}

	@Override
	public User createNewUser(UserDTO userRegister) {
		User user = new User();
		user.setUsername(userRegister.getUsername());
		user.setPassword(userRegister.getPassword());
		user.setFirstname(userRegister.getFirstname());
		user.setLastname(userRegister.getLastname());
		user.setEmail(userRegister.getUsermail());
		user.setFakemoney(0);
		user.setFacebookid("");
		userDao.save(user);
		return user;
	}

}
