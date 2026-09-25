package com.example.demo.OPERVIA_PROJECT.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.OPERVIA_PROJECT.entity.AuditHistory;

public interface AuditHistoryRepository extends JpaRepository<AuditHistory, Long> {

    List<AuditHistory> findByRequestIdOrderByCreatedAtAsc(Long requestId);

}