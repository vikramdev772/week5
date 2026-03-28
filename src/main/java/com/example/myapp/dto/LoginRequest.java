package com.example.myapp.dto;

import lombok.Data;

@Data
public class LoginRequest {
    String email;
    String password;
}
