package com.example.myapp;
import java.util.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Main{
    @GetMapping("/fruits")
    HashMap<Object,Object>  m(){
    HashMap<Object,Object> res=new HashMap<>();
    res.put("msg","welcome to fruits api");
    res.put("mango","🥭");
    res.put("apple","🍎🍏");
    res.put("status","200 ok");
    res.put("sucess","true");
    return res;
    }
}