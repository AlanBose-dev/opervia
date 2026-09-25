package com.example.demo.OPERVIA_PROJECT.dto;

import java.time.LocalDateTime;

public class RequestCategoryResponse {

    private Long id;
    private String name;
    private String description;
    private Boolean active;
    private Long organizationId;
    private LocalDateTime createdAt;

    public RequestCategoryResponse() {
    }

    public RequestCategoryResponse(
            Long id,
            String name,
            String description,
            Boolean active,
            Long organizationId,
            LocalDateTime createdAt) {

        this.id = id;
        this.name = name;
        this.description = description;
        this.active = active;
        this.organizationId = organizationId;
        this.createdAt = createdAt;
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Long getOrganizationId() {
		return organizationId;
	}

	public void setOrganizationId(Long organizationId) {
		this.organizationId = organizationId;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

    // Generate getters and setters for all fields
}