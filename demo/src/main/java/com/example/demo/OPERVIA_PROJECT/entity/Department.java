package com.example.demo.OPERVIA_PROJECT.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "department")
public class Department {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	public Long getId() {
	    return id;
	}

	public void setId(Long id) {
	    this.id = id;
	}
    private String name;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

    private LocalDateTime createdAt;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}
	public Organization getOrganization() {
	    return organization;
	}

	public void setOrganization(Organization organization) {
	    this.organization = organization;
	}

	
	

    // Getters and Setters
}