package com.example.demo.OPERVIA_PROJECT.dto;

import java.time.LocalDateTime;

public class AuditHistoryResponse {
	private Long id;
	private Long requestId;
	private Long userId;
	private String username;
	private String action;
	private String oldValue;
	private String newValue;
	private LocalDateTime createdAt;
	
	public AuditHistoryResponse(
	        Long id,
	        Long requestId,
	        Long userId,
	        String username,
	        String action,
	        String oldValue,
	        String newValue,
	        LocalDateTime createdAt) {

	    this.id = id;
	    this.requestId = requestId;
	    this.userId = userId;
	    this.username = username;
	    this.action = action;
	    this.oldValue = oldValue;
	    this.newValue = newValue;
	    this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getRequestId() {
		return requestId;
	}

	public void setRequestId(Long requestId) {
		this.requestId = requestId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getOldValue() {
		return oldValue;
	}

	public void setOldValue(String oldValue) {
		this.oldValue = oldValue;
	}

	public String getNewValue() {
		return newValue;
	}

	public void setNewValue(String newValue) {
		this.newValue = newValue;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

}
