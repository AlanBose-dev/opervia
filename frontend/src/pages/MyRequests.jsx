import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./MyRequests.css";

function MyRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadRequests() {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/user/requests");

            console.log("My requests:", response.data);

            setRequests(response.data);
        } catch (error) {
            console.error("Failed to load requests:", error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (!error.response) {
                setError("Unable to connect to the server.");
            } else {
                setError("Failed to load requests.");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRequests();
    }, []);

    function getStatusClass(status) {
        const value = status?.toLowerCase();

        if (value === "open") return "status-open";
        if (value === "in progress") return "status-progress";
        if (value === "resolved") return "status-resolved";
        if (value === "closed") return "status-closed";
        if (value === "reopened") return "status-reopened";

        return "status-default";
    }

    function getPriorityClass(priority) {
        const value = priority?.toLowerCase();

        if (value === "high") return "priority-high";
        if (value === "medium") return "priority-medium";
        if (value === "low") return "priority-low";

        return "priority-default";
    }

    return (
        <div className="requests-page">

            {/* Header */}

            <div className="requests-header">

                <div>
                    <p className="requests-eyebrow">
                        REQUESTS
                    </p>

                    <h1>My Requests</h1>

                    <p className="requests-subtitle">
                        View and manage the requests you have submitted.
                    </p>
                </div>

                <Link
                    to="/requests/create"
                    className="requests-create-button"
                >
                    <span>+</span>
                    Create Request
                </Link>

            </div>


            {/* Loading */}

            {loading && (
                <div className="requests-state">

                    <div className="requests-spinner"></div>

                    <p>Loading your requests...</p>

                </div>
            )}


            {/* Error */}

            {!loading && error && (
                <div className="requests-error">

                    <div className="requests-error-icon">
                        !
                    </div>

                    <div>
                        <h3>Unable to load requests</h3>

                        <p>{error}</p>

                        <button
                            type="button"
                            onClick={loadRequests}
                        >
                            Try Again
                        </button>
                    </div>

                </div>
            )}


            {/* Empty */}

            {!loading && !error && requests.length === 0 && (
                <div className="requests-empty">

                    <div className="requests-empty-icon">
                        +
                    </div>

                    <h2>No requests yet</h2>

                    <p>
                        You haven't submitted any requests.
                        Create your first request to get started.
                    </p>

                    <Link
                        to="/requests/create"
                        className="requests-empty-button"
                    >
                        Create Your First Request
                    </Link>

                </div>
            )}


            {/* Desktop Table */}

            {!loading && !error && requests.length > 0 && (
                <div className="requests-table-card">

                    <div className="requests-table-header">

                        <div>
                            <h2>All Requests</h2>

                            <p>
                                {requests.length} request
                                {requests.length !== 1 ? "s" : ""}
                            </p>
                        </div>

                    </div>


                    <div className="requests-table-wrapper">

                        <table className="requests-table">

                            <thead>
                                <tr>
                                    <th>Request</th>
                                    <th>Category</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>

                                {requests.map((request) => (

                                    <tr key={request.id}>

                                        <td>
                                            <div className="request-title-cell">

                                                <strong>
                                                    {request.title}
                                                </strong>

                                                <span>
                                                    {request.description}
                                                </span>

                                            </div>
                                        </td>

                                        <td>
                                            <span className="request-category">
                                                {request.categoryName}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`request-priority ${getPriorityClass(
                                                    request.priority
                                                )}`}
                                            >
                                                {request.priority}
                                            </span>
                                        </td>

                                        <td>
                                            <span
                                                className={`request-status ${getStatusClass(
                                                    request.status
                                                )}`}
                                            >
                                                <span></span>
                                                {request.status}
                                            </span>
                                        </td>

                                        <td className="request-action-cell">

                                            <Link
                                                to={`/requests/${request.id}`}
                                                className="request-view-button"
                                            >
                                                View
                                            </Link>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>
            )}


            {/* Mobile Cards */}

            {!loading && !error && requests.length > 0 && (
                <div className="requests-mobile-list">

                    {requests.map((request) => (

                        <div
                            className="request-mobile-card"
                            key={request.id}
                        >

                            <div className="request-mobile-top">

                                <h3>{request.title}</h3>

                                <span
                                    className={`request-status ${getStatusClass(
                                        request.status
                                    )}`}
                                >
                                    <span></span>
                                    {request.status}
                                </span>

                            </div>

                            <p className="request-mobile-description">
                                {request.description}
                            </p>

                            <div className="request-mobile-meta">

                                <div>
                                    <span>Category</span>
                                    <strong>
                                        {request.categoryName}
                                    </strong>
                                </div>

                                <div>
                                    <span>Priority</span>
                                    <strong
                                        className={getPriorityClass(
                                            request.priority
                                        )}
                                    >
                                        {request.priority}
                                    </strong>
                                </div>

                            </div>

                            <Link
                                to={`/requests/${request.id}`}
                                className="request-mobile-view"
                            >
                                View Request →
                            </Link>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
}

export default MyRequests;