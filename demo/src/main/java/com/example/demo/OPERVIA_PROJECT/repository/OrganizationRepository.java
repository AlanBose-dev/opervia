package com.example.demo.OPERVIA_PROJECT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.OPERVIA_PROJECT.entity.Organization;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
	boolean existsByEmail(String email);
}