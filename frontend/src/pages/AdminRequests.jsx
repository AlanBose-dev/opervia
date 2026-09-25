import { useEffect, useState } from "react";
import api from "../services/api";

function AdminRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadRequests() {
        try {
            const response = await api.get("/admin/requests");
            setRequests(response.data);
        } catch (error) {
            console.error("Failed to load requests:", error);
            setError("Failed to load requests.");
        } finally {
            setLoading(false);
        }
    }

    async function updateStatus(requestId, newStatus) {
        try {
            const response = await api.put(
                `/admin/requests/${requestId}/status`,
                null,
                {
                    params: {
                        status: newStatus,
                    },
                }
            );

            setRequests((currentRequests) =>
                currentRequests.map((request) =>
                    request.id === requestId
                        ? { ...request, status: response.data.status }
                        : request
                )
            );
        } catch (error) {
            console.error("Failed to update status:", error);
            setError("Failed to update request status.");
        }
    }

    useEffect(() => {
        loadRequests();
    }, []);

    function getStatusClass(status) {
        switch (status) {
            case "OPEN":
                return "ov-status ov-status-open";
            case "IN_PROGRESS":
                return "ov-status ov-status-progress";
            case "RESOLVED":
                return "ov-status ov-status-resolved";
            case "CLOSED":
                return "ov-status ov-status-closed";
            case "REOPENED":
                return "ov-status ov-status-reopened";
            default:
                return "ov-status";
        }
    }

    function getPriorityClass(priority) {
        switch (priority) {
            case "HIGH":
                return "ov-priority ov-priority-high";
            case "MEDIUM":
                return "ov-priority ov-priority-medium";
            case "LOW":
                return "ov-priority ov-priority-low";
            default:
                return "ov-priority";
        }
    }

    function getNextStatuses(status) {
        switch (status) {
            case "OPEN":
                return ["IN_PROGRESS"];
            case "IN_PROGRESS":
                return ["RESOLVED"];
            case "RESOLVED":
                return ["CLOSED", "REOPENED"];
            case "REOPENED":
                return ["IN_PROGRESS"];
            case "CLOSED":
                return [];
            default:
                return [];
        }
    }

    return (
        <div className="op-page">

            {/* Page Header */}
            <div className="op-page-header">
                <div>
                    <h1 className="op-page-title">Requests</h1>
                    <p className="op-page-subtitle">
                        Manage and track requests submitted by organization users.
                    </p>
                </div>

                <div className="op-page-count">
                    <strong>{requests.length}</strong>
                    <span>Total Requests</span>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="alert alert-danger mb-4">
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="op-empty-card">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mb-0">Loading requests...</p>
                </div>
            )}

            {/* Empty */}
            {!loading && !error && requests.length === 0 && (
                <div className="op-empty-card">
                    <div className="op-empty-icon">✓</div>
                    <h5>No requests found</h5>
                    <p className="text-muted mb-0">
                        There are currently no requests in your organization.
                    </p>
                </div>
            )}

            {/* Requests */}
            {!loading && requests.length > 0 && (
                <div className="op-table-card">

                    <div className="table-responsive">
                        <table className="table op-admin-table align-middle mb-0">

                            <thead>
                                <tr>
                                    <th>Request</th>
                                    <th>Requester</th>
                                    <th>Department</th>
                                    <th>Category</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {requests.map((request) => {
                                    const nextStatuses = getNextStatuses(request.status);

                                    return (
                                        <tr key={request.id}>

                                            {/* Request */}
                                            <td>
                                                <div className="op-request-title">
                                                    {request.title}
                                                </div>

                                                <div className="op-request-description">
                                                    {request.description}
                                                </div>

                                                <div className="op-request-id">
                                                    #{request.id}
                                                </div>
                                            </td>

                                            {/* Requester */}
                                            <td>
                                                <div className="op-user-name">
                                                    {request.requesterName || "Unknown"}
                                                </div>
                                            </td>

                                            {/* Department */}
                                            <td>
                                                {request.departmentName ? (
                                                    <span className="op-department">
                                                        {request.departmentName}
                                                    </span>
                                                ) : (
                                                    <span className="text-muted">
                                                        Not assigned
                                                    </span>
                                                )}
                                            </td>

                                            {/* Category */}
                                            <td>
                                                <span className="op-category">
                                                    {request.categoryName || "Uncategorized"}
                                                </span>
                                            </td>

                                            {/* Priority */}
                                            <td>
                                                <span className={getPriorityClass(request.priority)}>
                                                    {request.priority || "NORMAL"}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td>
                                                <span className={getStatusClass(request.status)}>
                                                    {request.status.replace("_", " ")}
                                                </span>
                                            </td>

                                            {/* Action */}
                                            <td>
                                                {nextStatuses.length > 0 ? (
                                                    <select
                                                        className="form-select form-select-sm op-status-select"
                                                        value=""
                                                        onChange={(event) => {
                                                            if (event.target.value) {
                                                                updateStatus(
                                                                    request.id,
                                                                    event.target.value
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <option value="">
                                                            Update status
                                                        </option>

                                                        {nextStatuses.map((status) => (
                                                            <option
                                                                key={status}
                                                                value={status}
                                                            >
                                                                {status.replace("_", " ")}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className="text-muted small">
                                                        No actions
                                                    </span>
                                                )}
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>

                        </table>
                    </div>

                </div>
            )}
        </div>
    );
}

export default AdminRequests;