package com.cranecoding.controller;

import java.io.IOException;
import java.util.Hashtable;

import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.cranecoding.dto.user.UserDTO;
import com.cranecoding.model.User;
import com.cranecoding.service.GameService;
import com.cranecoding.service.UserService;

@Controller
public class AuthenticationController {

	@Autowired
	UserService userService;

	@Autowired
	GameService gameService;

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home(HttpServletRequest request) {
		return "index";
	}

	@RequestMapping(value = "/api/exercise/authentication", method = RequestMethod.POST)
	public @ResponseBody boolean checkValidUser(HttpServletRequest request, @RequestBody String jsonUserInfor)
			throws JsonParseException, JsonMappingException, IOException {
		System.out.println("authen " + userService.checkIfValidUser(jsonUserInfor));
		return userService.checkIfValidUser(jsonUserInfor);
	}

	@RequestMapping(value = "/api/exercise/register", method = RequestMethod.POST)
	public @ResponseBody Hashtable<String, Comparable> registerUserAccount(@RequestBody UserDTO userRegister) {
		Hashtable user;
		user = new Hashtable();
		if (userService.checkIsUserNameExsit(userRegister)) {
			user.put("message", "Your new account have been created");
			user.put("success", true);
			User after = userService.createNewUser(userRegister);
			gameService.openExerciseNewUser(after.getUserid());
		} else {
			user.put("message", "Your user name or email is already exsit");
			user.put("success", false);
		}
		return user;
	}
}
