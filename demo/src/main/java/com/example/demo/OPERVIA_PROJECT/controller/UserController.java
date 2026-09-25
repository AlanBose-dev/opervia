package com.example.demo.OPERVIA_PROJECT.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.demo.OPERVIA_PROJECT.dto.UserProfileResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.security.core.Authentication;
import com.example.demo.OPERVIA_PROJECT.dto.LoginRequest;
import com.example.demo.OPERVIA_PROJECT.dto.UserResponse;
import com.example.demo.OPERVIA_PROJECT.entity.User;
import com.example.demo.OPERVIA_PROJECT.repository.UserRepository;
import com.example.demo.OPERVIA_PROJECT.service.UserService;

@RestController
public class UserController {
	private final UserRepository userRepository;
    private final UserService userService;

    public UserController(
            UserService userService,
            UserRepository userRepository) {

        this.userService = userService;
        this.userRepository = userRepository;
    }
    @PostMapping("/users/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }
    @GetMapping("/user/test")
    public String userTest(Authentication authentication) {
        return authentication.getAuthorities().toString();
    }
    @GetMapping("/admin/test")
    public String adminTest(Authentication authentication) {
        return authentication.getAuthorities().toString();
    }
    @GetMapping("/user/profile")
    public UserProfileResponse getUserProfile(Authentication authentication) {
        return userService.getUserProfile(authentication);
    }
    @GetMapping("/admin/users")
    public List<UserResponse> getUsersForAdmin(Authentication authentication) {
        return userService.getUsersForAdmin(authentication);
    }
    @GetMapping("/user/organization")
    public String userOrganization(Authentication authentication) {

        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return "Organization ID: " + user.getOrganization().getId();
    }
    @PutMapping("/admin/users/{userId}/status")
    public UserProfileResponse updateUserStatus(
            @PathVariable Long userId,
            @RequestParam Boolean status,
            Authentication authentication) {

        return userService.updateUserStatus(
                userId,
                status,
                authentication
        );
   
    }
    @PutMapping("/admin/users/{userId}/department")
    public UserProfileResponse assignDepartment(
            @PathVariable Long userId,
            @RequestParam Long departmentId,
            Authentication authentication) {

        return userService.assignDepartment(
                userId,
                departmentId,
                authentication
        );
    }
    @PostMapping("/users/login")
    public String login(@RequestBody LoginRequest request) {

        return userService.loginUser(
                request.getEmail(),
                request.getPassword()
        );
    }
}