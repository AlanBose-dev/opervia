package com.example.demo.OPERVIA_PROJECT.repository;

import com.example.demo.OPERVIA_PROJECT.entity.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface RequestRepository
extends JpaRepository<Request, Long>,
        JpaSpecificationExecutor<Request> {
	long countByOrganizationIdAndCreatedById(Long organizationId, Long userId);

	long countByOrganizationIdAndCreatedByIdAndStatus(
	        Long organizationId,
	        Long userId,
	        String status
	);
	List<Request> findByOrganizationIdAndCreatedById(
	        Long organizationId,
	        Long userId
	);
	List<Request> findByOrganizationId(Long organizationId);
	}