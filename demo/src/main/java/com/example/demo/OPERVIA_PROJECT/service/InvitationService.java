package com.example.demo.OPERVIA_PROJECT.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;

import org.springframework.stereotype.Service;

import com.example.demo.OPERVIA_PROJECT.dto.UserInvitationRegistrationRequest;
import com.example.demo.OPERVIA_PROJECT.entity.Invitation;
import com.example.demo.OPERVIA_PROJECT.entity.User;
import com.example.demo.OPERVIA_PROJECT.repository.InvitationRepository;
import com.example.demo.OPERVIA_PROJECT.repository.UserRepository;

import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class InvitationService {
	private final PasswordEncoder passwordEncoder;
    private final InvitationRepository invitationRepository;
    private final UserRepository userRepository;

    public InvitationService(
            InvitationRepository invitationRepository,
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.invitationRepository = invitationRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Invitation createInvitation(
            String invitedEmail,
            Authentication authentication) {

        String adminEmail = authentication.getName();

        User admin = userRepository.findByEmail(adminEmail)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        SecureRandom secureRandom = new SecureRandom();

        byte[] randomBytes = new byte[32];
        secureRandom.nextBytes(randomBytes);

        String token = Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(randomBytes);

        Invitation invitation = new Invitation();

        invitation.setEmail(invitedEmail);
        invitation.setOrganization(admin.getOrganization());
        invitation.setInvitedBy(admin);
        invitation.setToken(token);
        invitation.setStatus("PENDING");
        invitation.setCreatedAt(LocalDateTime.now());
        invitation.setExpiresAt(LocalDateTime.now().plusHours(24));

        return invitationRepository.save(invitation);
    }
    public Invitation validateInvitation(String token) {

        Invitation invitation = invitationRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid invitation token"));

        if (!"PENDING".equals(invitation.getStatus())) {
            throw new RuntimeException("Invitation has already been used");
        }

        if (invitation.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Invitation has expired");
        }

        return invitation;
    }
    public User registerInvitedUser(UserInvitationRegistrationRequest request) {

        Invitation invitation = validateInvitation(request.getToken());

        if (userRepository.existsByEmail(invitation.getEmail())) {
            throw new RuntimeException("User with this email already exists");
        }

        User user = new User();

        user.setUsername(request.getUsername());
        user.setEmail(invitation.getEmail());
        user.setPasswordHash(
                passwordEncoder.encode(request.getPassword())
        );
        user.setRole("USER");
        user.setStatus(true);
        user.setOrganization(invitation.getOrganization());

        User savedUser = userRepository.save(user);

        invitation.setStatus("USED");
        invitationRepository.save(invitation);

        return savedUser;
    }
}