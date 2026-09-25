package com.example.demo.OPERVIA_PROJECT.dto;

public class RequestDashboardResponse {

    private long totalRequests;
    private long openRequests;
    private long inProgressRequests;
    private long resolvedRequests;
    private long closedRequests;
    private long reopenedRequests;

    public RequestDashboardResponse() {
    }

    public RequestDashboardResponse(
            long totalRequests,
            long openRequests,
            long inProgressRequests,
            long resolvedRequests,
            long closedRequests,
            long reopenedRequests) {

        this.totalRequests = totalRequests;
        this.openRequests = openRequests;
        this.inProgressRequests = inProgressRequests;
        this.resolvedRequests = resolvedRequests;
        this.closedRequests = closedRequests;
        this.reopenedRequests = reopenedRequests;
    }

	public long getTotalRequests() {
		return totalRequests;
	}

	public void setTotalRequests(long totalRequests) {
		this.totalRequests = totalRequests;
	}

	public long getOpenRequests() {
		return openRequests;
	}

	public void setOpenRequests(long openRequests) {
		this.openRequests = openRequests;
	}

	public long getInProgressRequests() {
		return inProgressRequests;
	}

	public void setInProgressRequests(long inProgressRequests) {
		this.inProgressRequests = inProgressRequests;
	}

	public long getResolvedRequests() {
		return resolvedRequests;
	}

	public void setResolvedRequests(long resolvedRequests) {
		this.resolvedRequests = resolvedRequests;
	}

	public long getClosedRequests() {
		return closedRequests;
	}

	public void setClosedRequests(long closedRequests) {
		this.closedRequests = closedRequests;
	}

	public long getReopenedRequests() {
		return reopenedRequests;
	}

	public void setReopenedRequests(long reopenedRequests) {
		this.reopenedRequests = reopenedRequests;
	}

    // Generate getters and setters
}