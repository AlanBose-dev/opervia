package com.example.demo.OPERVIA_PROJECT.controller;

import java.util.List;


import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.OPERVIA_PROJECT.dto.RequestCategoryRequest;
import com.example.demo.OPERVIA_PROJECT.dto.RequestCategoryResponse;
import com.example.demo.OPERVIA_PROJECT.dto.RequestCategoryUpdateRequest;
import com.example.demo.OPERVIA_PROJECT.entity.RequestCategory;
import com.example.demo.OPERVIA_PROJECT.service.RequestCategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/admin/categories")
public class RequestCategoryController {

    private final RequestCategoryService requestCategoryService;

    public RequestCategoryController(
            RequestCategoryService requestCategoryService) {

        this.requestCategoryService = requestCategoryService;
    }
    @GetMapping
    public List<RequestCategoryResponse> getCategories(
            Authentication authentication) {

        return requestCategoryService.getCategories(authentication);
    }
    @PostMapping
    public RequestCategory createCategory(
            @Valid @RequestBody RequestCategoryRequest request,
            Authentication authentication) {

        return requestCategoryService.createCategory(
                request, authentication);
    }
    @PutMapping("/{categoryId}")
    public RequestCategoryResponse updateCategory(
            @PathVariable Long categoryId,
            @Valid @RequestBody RequestCategoryUpdateRequest request,
            Authentication authentication) {

        return requestCategoryService.updateCategory(
                categoryId, request, authentication);
    }
    
}