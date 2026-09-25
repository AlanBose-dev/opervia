package com.example.demo.OPERVIA_PROJECT.dto;

import jakarta.validation.constraints.NotBlank;

public class RequestCategoryUpdateRequest {

    @NotBlank
    private String name;

    private String description;

    public RequestCategoryUpdateRequest() {
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
}