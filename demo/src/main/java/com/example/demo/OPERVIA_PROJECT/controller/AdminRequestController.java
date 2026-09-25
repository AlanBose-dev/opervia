package com.example.demo.OPERVIA_PROJECT.controller;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.OPERVIA_PROJECT.dto.RequestResponse;
import com.example.demo.OPERVIA_PROJECT.service.RequestService;
import com.example.demo.OPERVIA_PROJECT.util.RequestStatus;

@RestController
@RequestMapping("/admin/requests")
public class AdminRequestController {

    private final RequestService requestService;

    public AdminRequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping
    public List<RequestResponse> getRequests(
            Authentication authentication) {

        return requestService.getRequestsForAdmin(authentication);
    }
    @PutMapping("/{requestId}/status")
    public RequestResponse updateRequestStatus(
            @PathVariable Long requestId,
            @RequestParam RequestStatus status,
            Authentication authentication) {

        return requestService.updateRequestStatus(
                requestId,
                status,
                authentication
        );
    }
}