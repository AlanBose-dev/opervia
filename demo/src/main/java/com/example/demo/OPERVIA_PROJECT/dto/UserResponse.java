package com.example.demo.OPERVIA_PROJECT.dto;

public class UserResponse {

    private Long id;
    private String username;
    private String email;
    private String contact;
    private String role;
    private Boolean status;
    private Long departmentId;
    private String departmentName;
    public UserResponse() {
    }

    public UserResponse(
            Long id,
            String username,
            String email,
            String contact,
            String role,
            Boolean status,
            Long departmentId,
            String departmentName) {

        this.id = id;
        this.username = username;
        this.email = email;
        this.contact = contact;
        this.role = role;
        this.status = status;
        this.departmentId = departmentId;
        this.departmentName = departmentName;
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
}