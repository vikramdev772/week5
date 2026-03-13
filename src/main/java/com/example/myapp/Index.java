package com.example.myapp;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.dto.R;
@CrossOrigin(origins = "*")
@RestController
public class Index {
    @GetMapping("/")
    R M(){
        return new R();
    }
}
