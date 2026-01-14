package com.example.myapp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.myapp.dto.LoginRequest;
import com.example.myapp.dto.SignupReq;
import com.example.myapp.model.User;
import com.example.myapp.repo.UserRepo;

@Service
public class AuthService {

    @Autowired
    private UserRepo userRepo;

    public String signup(SignupReq req) {

        if (userRepo.findByEmail(req.getEmail()).isPresent()) {
            return "Email already exists";
        }

        User user = new User();
        user.setName(req.getName());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword()); // plain text (demo)

        userRepo.save(user);
        return "Signup successful";
    }

    public String login(LoginRequest req) {

        Optional<User> userOpt = userRepo.findByEmail(req.getEmail());

        if (userOpt.isEmpty()) {
            return "Invalid email or password";
        }

        User user = userOpt.get();

        if (!user.getPassword().equals(req.getPassword())) {
            return "Invalid email or password";
        }

        return "Login successful";
    }
}
