package com.example.myapp.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.dto.LoginRequest;
import com.example.myapp.dto.SignupReq;
import com.example.myapp.model.User;
import com.example.myapp.repo.UserRepo;
import com.example.myapp.security.JwtService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/a")
public class Auth {

    @Autowired
    UserRepo db;
    @Autowired
    JwtService jwtService;

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
        return "signup success ...!";
    }

    @PostMapping("/login")
    public Map<Object,Object> login(@RequestBody LoginRequest data) {
       Map<Object,Object> res = new HashMap<>();
       Optional<User> op = db.findByEmail(data.getEmail());
        if (op.isEmpty()) {
            res.put("message", "Invalid credentials");
            return res;
        }
        User user = op.get();
        if (!user.getPassword().equals(data.getPassword())) {
            res.put("message", "Invalid credentials");
            return res;
        }
        String token = jwtService.generateToken(user.getEmail());
        res.put("token", token);
        return res;
    }

    }


