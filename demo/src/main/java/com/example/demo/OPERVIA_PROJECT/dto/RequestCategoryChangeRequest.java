package com.example.demo.OPERVIA_PROJECT.dto;

import jakarta.validation.constraints.NotNull;

public class RequestCategoryChangeRequest {

    @NotNull
    private Long categoryId;

    public RequestCategoryChangeRequest() {
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
}