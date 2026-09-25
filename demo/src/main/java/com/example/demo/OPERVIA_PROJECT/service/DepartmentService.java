package com.example.demo.OPERVIA_PROJECT.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import com.example.demo.OPERVIA_PROJECT.dto.DepartmentRequest;
import com.example.demo.OPERVIA_PROJECT.entity.User;
import com.example.demo.OPERVIA_PROJECT.entity.Department;
import com.example.demo.OPERVIA_PROJECT.repository.DepartmentRepository;
import com.example.demo.OPERVIA_PROJECT.repository.UserRepository;

@Service
public class DepartmentService {
	private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;

    public DepartmentService(
            DepartmentRepository departmentRepository,
            UserRepository userRepository) {

        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }
    public Department createDepartment(
            DepartmentRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Department department = new Department();

        department.setName(request.getName());
        department.setOrganization(admin.getOrganization());
        department.setCreatedAt(LocalDateTime.now());

        return departmentRepository.save(department);
    
    }
    public List<Department> getDepartmentsForAdmin(Authentication authentication) {

        String email = authentication.getName();

        User admin = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long organizationId = admin.getOrganization().getId();

        return departmentRepository.findByOrganizationId(organizationId);
    }
}