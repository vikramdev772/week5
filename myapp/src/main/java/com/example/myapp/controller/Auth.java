// package com.example.myapp.controller;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RestController;

// import com.example.myapp.dto.SignupReq;
// import com.example.myapp.model.User;
// import com.example.myapp.repo.UserRepo;

// @CrossOrigin(origins = "*")
// @RestController
// public class Auth {
    
//     @Autowired
//     UserRepo db;

//     @PostMapping("/signup")
//     String Signup(@RequestBody SignupReq sd){
//         System.out.println("\n\t name : "+sd.getName());
//         System.out.println("\n\t email : "+sd.getEmail());
//         System.out.println("\n\t password : "+sd.getPassword());

//         User ud=new User();
//         ud.setName(sd.getName());
//         ud.setEmail(sd.getEmail());
//         ud.setPassword(sd.getPassword());


//         db.save(ud);
//         return "signup sucess ...!";
//     }
    
// }


package com.example.myapp.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.myapp.dto.SignupReq;
import com.example.myapp.model.User;
import com.example.myapp.repo.UserRepo;

@CrossOrigin(origins = "*")
@RestController
public class Auth {

    @Autowired
    UserRepo db;

    // ================= SIGNUP =================
    @PostMapping("/signup")
    public String signup(@RequestBody SignupReq sd) {

        User ud = new User();
        ud.setName(sd.getName());
        ud.setEmail(sd.getEmail());
        ud.setPassword(sd.getPassword());

        db.save(ud);
        return "Signup success!";
    }

    // ================= LOGIN =================
    @PostMapping("/login")
    public String login(@RequestBody SignupReq sd) {

        Optional<User> optionalUser = db.findByEmail(sd.getEmail());

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        User user = optionalUser.get();

        if (!user.getPassword().equals(sd.getPassword())) {
            return "Invalid password";
        }

        return "Login successful";
    }

    // ================= DELETE USER =================
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable Long id) {

        Optional<User> optionalUser = db.findById(id);

        if (optionalUser.isEmpty()) {
            return "User not found";
        }

        db.deleteById(id);
        return "User deleted successfully";
    }
}

