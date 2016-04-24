package com.cranecoding.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cranecoding.service.UserService;

@Controller
public class AuthenticationController {
	
	@Autowired
	UserService userService;
	
	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home(HttpServletRequest request) {
		return "index";	
	}
	
	@RequestMapping(value ="/api/exercise/authentication", method = RequestMethod.POST)
	public @ResponseBody boolean checkValidUser(HttpServletRequest request, @RequestBody String jsonUserInfor) throws JsonParseException, JsonMappingException, IOException{
		return userService.checkIfValidUser(jsonUserInfor);
	}
	
}
