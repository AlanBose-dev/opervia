package com.example.demo.OPERVIA_PROJECT.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.OPERVIA_PROJECT.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByEmail(String email);
    List<User> findByOrganizationId(Long organizationId);
    Optional<User> findByEmail(String email);
}