package com.example.myapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.dto.SignupReq;
import com.example.myapp.dto.LoginRequest;
import com.example.myapp.service.AuthService;
import com.example.myapp.model.User;
import com.example.myapp.repo.UserRepo;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class Auth {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public String signup(@RequestBody SignupReq req) {
        return authService.signup(req);
    }
    
    @PostMapping("/login")
    public String login(@RequestBody LoginRequest req) {
        return authService.login(req);
    }
}
