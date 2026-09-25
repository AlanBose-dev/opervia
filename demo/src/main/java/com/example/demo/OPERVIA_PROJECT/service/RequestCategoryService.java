package com.example.demo.OPERVIA_PROJECT.service;

import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.security.core.Authentication;

import com.example.demo.OPERVIA_PROJECT.dto.RequestCategoryRequest;
import com.example.demo.OPERVIA_PROJECT.dto.RequestCategoryResponse;
import com.example.demo.OPERVIA_PROJECT.dto.RequestCategoryUpdateRequest;
import com.example.demo.OPERVIA_PROJECT.entity.RequestCategory;
import com.example.demo.OPERVIA_PROJECT.entity.User;
import com.example.demo.OPERVIA_PROJECT.repository.UserRepository;
import com.example.demo.OPERVIA_PROJECT.repository.RequestCategoryRepository;

@Service
public class RequestCategoryService {
	private final UserRepository userRepository;
    private final RequestCategoryRepository requestCategoryRepository;

    public RequestCategoryService(
            RequestCategoryRepository requestCategoryRepository,
            UserRepository userRepository) {

        this.requestCategoryRepository = requestCategoryRepository;
        this.userRepository = userRepository;
    }
    public RequestCategory createCategory(
            RequestCategoryRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        RequestCategory category = new RequestCategory();

        category.setName(request.getName());
        category.setDescription(request.getDescription());
        category.setActive(true);
        category.setCreatedAt(LocalDateTime.now());
        category.setOrganization(admin.getOrganization());

        return requestCategoryRepository.save(category);
    }
    public RequestCategoryResponse updateCategory(
            Long categoryId,
            RequestCategoryUpdateRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        RequestCategory category = requestCategoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Category must belong to admin's organization
        if (!category.getOrganization().getId()
                .equals(admin.getOrganization().getId())) {

            throw new RuntimeException("Access denied");
        }

        category.setName(request.getName());
        category.setDescription(request.getDescription());

        RequestCategory savedCategory =
                requestCategoryRepository.save(category);

        return new RequestCategoryResponse(
                savedCategory.getId(),
                savedCategory.getName(),
                savedCategory.getDescription(),
                savedCategory.getActive(),
                savedCategory.getOrganization().getId(),
                savedCategory.getCreatedAt()
        );
    }
    public List<RequestCategoryResponse> getCategories(
            Authentication authentication) {

        String email = authentication.getName();

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long organizationId = admin.getOrganization().getId();

        return requestCategoryRepository
                .findByOrganizationIdAndActiveTrue(organizationId)
                .stream()
                .map(category -> new RequestCategoryResponse(
                        category.getId(),
                        category.getName(),
                        category.getDescription(),
                        category.getActive(),
                        category.getOrganization().getId(),
                        category.getCreatedAt()
                ))
                .toList();
    }
}