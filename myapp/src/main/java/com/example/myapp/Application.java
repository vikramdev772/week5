package com.app.application;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {      // Your existing class name
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}