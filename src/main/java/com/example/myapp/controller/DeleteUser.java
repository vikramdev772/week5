package com.example.myapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.repo.UserRepo;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
public class DeleteUser {
    @Autowired
    UserRepo db;

    @DeleteMapping("/user/{id}")
    public String eleteUser(@PathVariable Long id) {

        db.deleteById(id);

        return "deleted successful";

    }

}