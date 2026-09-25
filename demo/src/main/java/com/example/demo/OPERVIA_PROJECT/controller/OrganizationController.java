package com.example.demo.OPERVIA_PROJECT.controller;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.OPERVIA_PROJECT.dto.OrganizationRequest;
import com.example.demo.OPERVIA_PROJECT.entity.Organization;
import com.example.demo.OPERVIA_PROJECT.service.OrganizationService;

import jakarta.validation.Valid;

@RestController

public class OrganizationController {
	@PostMapping("/organizations")
	public Organization createOrganization(
	        @Valid @RequestBody OrganizationRequest request) {

	    return organizationService.createOrganization(request);
	}
	@GetMapping("/admin/organization")
	public Organization getOrganizationForAdmin(Authentication authentication) {
	    return organizationService.getOrganizationForAdmin(authentication);
	}
	@GetMapping("/organizations/{id}")
	public Organization getOrganizationById(@PathVariable Long id) {
	    return organizationService.getOrganizationById(id);
	}
	private final OrganizationService organizationService;

	public OrganizationController(OrganizationService organizationService) {
	    this.organizationService = organizationService;
	}
}
