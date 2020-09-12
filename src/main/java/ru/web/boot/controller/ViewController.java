package ru.web.boot.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import ru.web.boot.model.User;
import ru.web.boot.service.UserService;

import java.security.Principal;

@Controller
public class ViewController {

    private UserService userService;

    @Autowired
    public ViewController(UserService userService) {
        this.userService = userService;
    }

    public ViewController() {
    }

    @GetMapping("/admin")
    public String adminHomePage(Model model, Principal principal) {
        model.addAttribute("users",userService.getAllUsers());
        return "adminpage";
    }

    @GetMapping("/user")
    public User userHomePage(Model model, Principal principal) {
        User user = (User) userService.loadUserByUsername(principal.getName());
        model.addAttribute("user", user);
        return user;
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }
}
