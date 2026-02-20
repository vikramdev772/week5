package com.example.myapp.controller;
import com.example.myapp.security.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.dto.LoginRequest;
import com.example.myapp.dto.SignupReq;
import com.example.myapp.model.User;
import com.example.myapp.repo.UserRepo;
@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class Auth {

    @Autowired
    UserRepo db;

    @PostMapping("/signup")
    String Signup(@RequestBody SignupReq sd) {
        System.out.println("\n\t name : " + sd.getName());
        System.out.println("\n\t email : " + sd.getEmail());
        System.out.println("\n\t password : " + sd.getPassword());

        User ud = new User();
        ud.setName(sd.getName());
        ud.setEmail(sd.getEmail());
        ud.setPassword(sd.getPassword());

        db.save(ud);
        return "signup sucess ...!";
    }


    @Autowired
    private JwtService jwtService;   // 🔥 ADD THIS

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest data) {

        User user = db.findByEmail(data.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(data.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // 🔥 GENERATE TOKEN HERE
        String token = jwtService.generateToken(user.getEmail());

        return token;   // return JWT
    }
}