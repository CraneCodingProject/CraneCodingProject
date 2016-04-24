package com.cranecoding.serviceImp;

import java.io.IOException;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cranecoding.dto.user.UserDAO;
import com.cranecoding.dto.user.UserDTO;
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

}
