package com.example.demo.OPERVIA_PROJECT.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.OPERVIA_PROJECT.dto.DepartmentRequest;
import com.example.demo.OPERVIA_PROJECT.entity.Department;
import com.example.demo.OPERVIA_PROJECT.service.DepartmentService;

@RestController
public class DepartmentController {

    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping("/departments")
    public Department createDepartment(
            @RequestBody DepartmentRequest request,
            Authentication authentication) {

        return departmentService.createDepartment(request, authentication);
    }
    @GetMapping("/departments")
    public List<Department> getDepartmentsForAdmin(
            Authentication authentication) {
        return departmentService.getDepartmentsForAdmin(authentication);
    }
}