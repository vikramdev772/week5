package com.example.myapp.controller;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.myapp.model.*;
import com.example.myapp.repo.UserRepo;
@CrossOrigin(origins = "*")
@RestController
public class AllUsers {

    @Autowired
    UserRepo db;
    @GetMapping("/users")
    List<User> getAll(){
        return db.findAll();
    }
}
