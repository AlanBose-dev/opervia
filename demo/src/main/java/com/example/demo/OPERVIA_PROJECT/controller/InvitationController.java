package com.example.demo.OPERVIA_PROJECT.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import com.example.demo.OPERVIA_PROJECT.dto.UserInvitationRegistrationRequest;
import com.example.demo.OPERVIA_PROJECT.entity.User;
import com.example.demo.OPERVIA_PROJECT.entity.Invitation;
import com.example.demo.OPERVIA_PROJECT.service.InvitationService;

@RestController
@RequestMapping("/admin/invitations")
public class InvitationController {

    private final InvitationService invitationService;

    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }
    @GetMapping("/validate")
    public Invitation validateInvitation(@RequestParam String token) {
        return invitationService.validateInvitation(token);
    }
    @PostMapping("/register")
    public User registerInvitedUser(
            @Valid @RequestBody UserInvitationRegistrationRequest request) {

        return invitationService.registerInvitedUser(request);
    }
    @PostMapping
    public Invitation createInvitation(
            @RequestParam String email,
            Authentication authentication) {

        return invitationService.createInvitation(
                email,
                authentication
        );
    }
}