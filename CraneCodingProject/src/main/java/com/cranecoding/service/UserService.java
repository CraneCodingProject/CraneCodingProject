package com.cranecoding.service;

import java.io.IOException;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.stereotype.Service;
@Service
public interface UserService {

	boolean checkIfValidUser(String jsonUserInfor)  throws JsonParseException, JsonMappingException, IOException ;
	int getUserId(String username);
}
