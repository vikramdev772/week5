package com.example.myapp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.dto.SignupReq;
import com.example.myapp.model.User;
import com.example.myapp.repo.UserRepo;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")   // base path
public class Update {

    @Autowired
    private UserRepo db;

    @PutMapping("/update/{id}")
    public String updateUser(@PathVariable Long id,
                             @RequestBody SignupReq sd) {

        Optional<User> op = db.findById(id);

        if (op.isPresent()) {
            User ud = op.get();
            ud.setName(sd.getName());
            ud.setEmail(sd.getEmail());
            db.save(ud);
            return "User updated successfully!";
        } else {
            return "User not found!";
        }
    }
}