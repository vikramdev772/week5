package com.example.myapp.Math;
import java.util.*;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
@CrossOrigin(origins = "*")
@RestController
public class Sum {
    @GetMapping("/sum/{n}")
    Map<Object,Object>  sum(@PathVariable int n ){
        Map<Object,Object> res=new HashMap<>();
        int r=0;
        for(int i=0;i<=n;i++){
            r=r+i;
        }
        res.put("msg","welcom sum to api ");
        res.put("number",n);
        res.put("sum of n ",r);
        return res;


    }
}
