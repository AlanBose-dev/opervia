package com.example.demo.OPERVIA_PROJECT.controller;

import com.example.demo.OPERVIA_PROJECT.dto.RequestCategoryChangeRequest;
import com.example.demo.OPERVIA_PROJECT.dto.RequestCategoryChangeResponse;
import com.example.demo.OPERVIA_PROJECT.dto.RequestDashboardResponse;
import com.example.demo.OPERVIA_PROJECT.dto.RequestResponse;
import com.example.demo.OPERVIA_PROJECT.dto.RequestSearchRequest;
import com.example.demo.OPERVIA_PROJECT.dto.RequestSearchResponse;
import com.example.demo.OPERVIA_PROJECT.entity.Request;
import com.example.demo.OPERVIA_PROJECT.entity.RequestCategory;
import com.example.demo.OPERVIA_PROJECT.service.RequestService;
import com.example.demo.OPERVIA_PROJECT.util.RequestStatus;

import jakarta.validation.Valid;

import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/requests")
public class RequestController {

	private final RequestService requestService;

	public RequestController(RequestService requestService) {
		this.requestService = requestService;
	}
	@GetMapping("/{requestId}")
	public RequestResponse getRequestById(
	        @PathVariable Long requestId,
	        Authentication authentication) {

	    return requestService.getRequestById(
	            requestId,
	            authentication
	    );
	}
	@GetMapping
	public List<RequestResponse> getRequests(Authentication authentication) {
		return requestService.getRequestsForUser(authentication);
	}

	@PutMapping("/{requestId}/status")
	public RequestResponse updateRequestStatus(@PathVariable Long requestId, @RequestParam RequestStatus status,
			Authentication authentication) {

		return requestService.updateRequestStatus(requestId, status, authentication);
	}

	@PostMapping
	public RequestResponse createRequest(@RequestBody Request request, Authentication authentication) {

		return requestService.createRequest(request, authentication);
	}
	@PutMapping("/{requestId}/category")
	public RequestCategoryChangeResponse updateRequestCategory(
	        @PathVariable Long requestId,
	        @Valid @RequestBody RequestCategoryChangeRequest categoryChangeRequest,
	        Authentication authentication) {

	    return requestService.updateRequestCategory(
	            requestId,
	            categoryChangeRequest,
	            authentication);
	}
	@GetMapping("/search")
	public RequestSearchResponse searchRequests(
	        RequestSearchRequest filter,
	        Authentication authentication) {

	    return requestService.searchRequests(
	            filter,
	            authentication
	    );
	}
	@GetMapping("/categories")
	public List<RequestCategory> getCategories(Authentication authentication) {
	    return requestService.getCategoriesForUser(authentication);
	}
	
	@GetMapping("/dashboard")
	public RequestDashboardResponse getDashboard(
	        Authentication authentication) {

	    return requestService.getDashboard(authentication);
	}
}