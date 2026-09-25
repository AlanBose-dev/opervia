package com.example.demo.OPERVIA_PROJECT.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.OPERVIA_PROJECT.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {
	List<Department> findByOrganizationId(Long organizationId);
}