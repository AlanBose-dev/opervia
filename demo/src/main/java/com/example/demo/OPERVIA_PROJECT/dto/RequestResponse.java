package com.example.demo.OPERVIA_PROJECT.dto;

import java.time.LocalDateTime;

public class RequestResponse {

	private Long id;
	private String title;
	private String description;
	private Long categoryId;
	private String categoryName;
	private String priority;
	private String status;
	private Long requesterId;
	private String requesterName;
	private Long organizationId;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private Long departmentId;
	private String departmentName;

	public RequestResponse() {
	}

	public RequestResponse(Long id, String title, String description, Long categoryId, String categoryName,
			String priority, String status, Long requesterId, String requesterName, Long organizationId,
			Long departmentId, String departmentName, LocalDateTime createdAt, LocalDateTime updatedAt) {

		this.id = id;
		this.title = title;
		this.description = description;
		this.categoryId = categoryId;
		this.categoryName = categoryName;
		this.priority = priority;
		this.status = status;
		this.requesterId = requesterId;
		this.requesterName = requesterName;
		this.organizationId = organizationId;
		this.departmentId = departmentId;
		this.departmentName = departmentName;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
	}

	public Long getId() {
		return id;
	}

	public Long getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Long getRequesterId() {
		return requesterId;
	}

	public void setRequesterId(Long requesterId) {
		this.requesterId = requesterId;
	}

	public String getRequesterName() {
		return requesterName;
	}

	public void setRequesterName(String requesterName) {
		this.requesterName = requesterName;
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

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	// Generate getters and setters for all fields
}