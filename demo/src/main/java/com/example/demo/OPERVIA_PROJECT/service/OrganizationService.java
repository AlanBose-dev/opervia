package com.example.demo.OPERVIA_PROJECT.service;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.example.demo.OPERVIA_PROJECT.repository.UserRepository;
import com.example.demo.OPERVIA_PROJECT.entity.User;

import com.example.demo.OPERVIA_PROJECT.dto.OrganizationRequest;
import com.example.demo.OPERVIA_PROJECT.entity.Organization;
import com.example.demo.OPERVIA_PROJECT.exception.DuplicateOrganizationException;
import com.example.demo.OPERVIA_PROJECT.exception.OrganizationNotFoundException;
import com.example.demo.OPERVIA_PROJECT.repository.OrganizationRepository;

@Service
public class OrganizationService {
	private final OrganizationRepository organizationRepository;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	public OrganizationService(
	        OrganizationRepository organizationRepository,
	        UserRepository userRepository,
	        PasswordEncoder passwordEncoder) {

	    this.organizationRepository = organizationRepository;
	    this.userRepository = userRepository;
	    this.passwordEncoder = passwordEncoder;
	}
	public Organization getOrganizationById(Long id) {
	    return organizationRepository.findById(id)
	            .orElseThrow(() ->
	                    new OrganizationNotFoundException("Organization not found"));
	}
	public Organization createOrganization(OrganizationRequest request) {

	    if (organizationRepository.existsByEmail(request.getEmail())) {
	        throw new DuplicateOrganizationException(
	                "Organization with this email already exists");
	    }

	    if (userRepository.existsByEmail(request.getAdminEmail())) {
	        throw new RuntimeException(
	                "Admin with this email already exists");
	    }

	    // Create organization
	    Organization organization = new Organization();

	    organization.setName(request.getName());
	    organization.setEmail(request.getEmail());
	    organization.setContact(request.getContact());
	    organization.setStatus(true);

	    Organization savedOrganization =
	            organizationRepository.save(organization);

	    // Create first admin user
	    User admin = new User();

	    admin.setUsername(request.getAdminUsername());
	    admin.setEmail(request.getAdminEmail());
	    admin.setPasswordHash(
	            passwordEncoder.encode(request.getAdminPassword()));
	    admin.setRole("ADMIN");
	    admin.setStatus(true);
	    admin.setOrganization(savedOrganization);

	    userRepository.save(admin);

	    return savedOrganization;
	}
	public Organization getOrganizationForAdmin(org.springframework.security.core.Authentication authentication) {

	    String email = authentication.getName();

	    User admin = userRepository.findByEmail(email)
	            .orElseThrow(() -> new RuntimeException("Admin not found"));

	    if (!"ADMIN".equals(admin.getRole())) {
	        throw new RuntimeException("Access denied");
	    }

	    if (admin.getOrganization() == null) {
	        throw new RuntimeException("Organization not found");
	    }

	    return admin.getOrganization();
	}
}