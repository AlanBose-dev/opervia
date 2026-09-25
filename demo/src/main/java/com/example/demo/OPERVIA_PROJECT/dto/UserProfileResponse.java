package com.example.demo.OPERVIA_PROJECT.dto;

public class UserProfileResponse {

    private Long id;
    private String username;
    private String email;
    private String contact;
    private String role;
    private Boolean status;
    private Long organizationId;
    private Long departmentId;
    private String departmentName;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Long getOrganizationId() {
        return organizationId;
    }

    public void setOrganizationId(Long organizationId) {
        this.organizationId = organizationId;
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
    public UserProfileResponse() {
    }

    public UserProfileResponse(Long id, String username, String email,
                               String contact, String role, Boolean status,
                               Long organizationId, Long departmentId,
                               String departmentName) {

        this.id = id;
        this.username = username;
        this.email = email;
        this.contact = contact;
        this.role = role;
        this.status = status;
        this.organizationId = organizationId;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
    }

    // Generate getters and setters for all fields
}