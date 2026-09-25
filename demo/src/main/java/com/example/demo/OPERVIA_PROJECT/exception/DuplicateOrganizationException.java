package com.example.demo.OPERVIA_PROJECT.exception;

public class DuplicateOrganizationException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public DuplicateOrganizationException(String message) {
        super(message);
    }
}