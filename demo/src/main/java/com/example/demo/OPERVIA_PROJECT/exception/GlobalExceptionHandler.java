package com.example.demo.OPERVIA_PROJECT.exception;


import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(DuplicateOrganizationException.class)
	public ResponseEntity<ApiErrorResponse> handleDuplicateOrganization(
	        DuplicateOrganizationException ex,
	        HttpServletRequest request) {

	    ApiErrorResponse response = new ApiErrorResponse();

	    response.setTimestamp(LocalDateTime.now());
	    response.setStatus(409);
	    response.setError("Conflict");
	    response.setMessage(ex.getMessage());
	    response.setPath(request.getRequestURI());

	    return ResponseEntity
	            .status(HttpStatus.CONFLICT)
	            .body(response);
	}
	
	}
