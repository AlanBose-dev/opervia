package com.example.demo.OPERVIA_PROJECT.dto;

import java.util.List;

public class RequestSearchResponse {

    private List<RequestResponse> requests;
    private int currentPage;
    private int pageSize;
    private long totalElements;
    private int totalPages;

    public RequestSearchResponse() {
    }

    public RequestSearchResponse(
            List<RequestResponse> requests,
            int currentPage,
            int pageSize,
            long totalElements,
            int totalPages) {

        this.requests = requests;
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

	public List<RequestResponse> getRequests() {
		return requests;
	}

	public void setRequests(List<RequestResponse> requests) {
		this.requests = requests;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public long getTotalElements() {
		return totalElements;
	}

	public void setTotalElements(long totalElements) {
		this.totalElements = totalElements;
	}

	public int getTotalPages() {
		return totalPages;
	}

	public void setTotalPages(int totalPages) {
		this.totalPages = totalPages;
	}

    // Generate getters and setters for all fields
}