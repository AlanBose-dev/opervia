package com.example.demo.OPERVIA_PROJECT.dto;

import java.time.LocalDateTime;

public class RequestCategoryChangeResponse {

    private Long requestId;
    private String oldCategory;
    private String newCategory;
    private LocalDateTime updatedAt;

    public RequestCategoryChangeResponse() {
    }

    public RequestCategoryChangeResponse(
            Long requestId,
            String oldCategory,
            String newCategory,
            LocalDateTime updatedAt) {

        this.requestId = requestId;
        this.oldCategory = oldCategory;
        this.newCategory = newCategory;
        this.updatedAt = updatedAt;
    }

	public Long getRequestId() {
		return requestId;
	}

	public void setRequestId(Long requestId) {
		this.requestId = requestId;
	}

	public String getOldCategory() {
		return oldCategory;
	}

	public void setOldCategory(String oldCategory) {
		this.oldCategory = oldCategory;
	}

	public String getNewCategory() {
		return newCategory;
	}

	public void setNewCategory(String newCategory) {
		this.newCategory = newCategory;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

    // Generate getters and setters for all fields
}