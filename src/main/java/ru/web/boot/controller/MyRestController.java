package ru.web.boot.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.web.boot.model.User;
import ru.web.boot.service.UserService;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/rest")
public class MyRestController {

    private UserService userService;

    @Autowired
    public MyRestController(UserService userService) {
        this.userService = userService;
    }

    public MyRestController() {
    }

    @GetMapping("/getusers")
    public List<User> getUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/getusernow")
    public User getUserNow(Principal principal){
        return(User) userService.loadUserByUsername(principal.getName());
    }

    @PostMapping("/adduser")
    public User addUserInDB(@RequestBody User user){
        userService.saveUser(user);
        return user;
    }

    @PutMapping("/edit")
    public User editUser(@RequestBody User user) {
        if (user.getPassword().isEmpty()) {
            user.setPassword(userService.getUserById(user.getId()).getPassword());
        }
        userService.updateUser(user);
        return user;
    }

    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable long id) {
        userService.deleteUserById(id);
    }

}
