package com.example.myapp.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.repo.UserRepo;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class Delete {

    @Autowired
    private UserRepo db;

    @DeleteMapping("/{id}")
    public Map<String, Object> deleteUser(@PathVariable Long id) {

        Map<String, Object> res = new HashMap<>();

        if (!db.existsById(id)) {
            res.put("success", false);
            res.put("message", "User not found");
            return res;
        }

        db.deleteById(id);

        res.put("success", true);
        res.put("message", "User deleted successfully");
        return res;
    }
}
