package com.example.demo.OPERVIA_PROJECT.controller;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.OPERVIA_PROJECT.dto.AuditHistoryResponse;
import com.example.demo.OPERVIA_PROJECT.service.AuditHistoryService;

@RestController
@RequestMapping("/user/requests")
public class AuditHistoryController {

    private final AuditHistoryService auditHistoryService;

    public AuditHistoryController(
            AuditHistoryService auditHistoryService) {

        this.auditHistoryService = auditHistoryService;
    }

    @GetMapping("/{requestId}/history")
    public List<AuditHistoryResponse> getHistory(
            @PathVariable Long requestId,
            Authentication authentication) {

        return auditHistoryService.getHistory(
                requestId, authentication);
    }
}