package com.example.demo.OPERVIA_PROJECT.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.OPERVIA_PROJECT.entity.RequestCategory;

public interface RequestCategoryRepository
        extends JpaRepository<RequestCategory, Long> {

    List<RequestCategory> findByOrganizationIdAndActiveTrue(Long organizationId);
}