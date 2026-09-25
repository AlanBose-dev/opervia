import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function RequestDetails() {
    const { id } = useParams();

    const [request, setRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadRequest() {
        try {
            const response = await api.get(`/user/requests/${id}`);

            console.log("Request details:", response.data);

            setRequest(response.data);
        } catch (error) {
            console.error("Failed to load request:", error);
            setError("Failed to load request.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadRequest();
    }, [id]);

    if (loading) {
        return <p>Loading request...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!request) {
        return <p>Request not found.</p>;
    }

    return (
    <div className="op-page">
        {/* Page Header */}
        <div className="op-page-header">
            <div>
                <div className="op-page-eyebrow">REQUEST</div>
                <h1 className="op-page-title">Request Details</h1>
                <p className="op-page-subtitle">
                    View the details and current status of this request.
                </p>
            </div>
        </div>

        {/* Main Request Card */}
        <div className="op-card op-request-details-card">

            <div className="op-request-details-header">
                <div>
                    <h2 className="op-request-title">
                        {request.title}
                    </h2>

                    <p className="op-request-description">
                        {request.description}
                    </p>
                </div>
            </div>

            {/* Status / Priority / Category */}
            <div className="op-request-meta">

                <div className="op-detail-item">
                    <span className="op-detail-label">STATUS</span>
                    <span className={`op-status-badge status-${request.status?.toLowerCase()}`}>
                        <span className="op-status-dot"></span>
                        {request.status}
                    </span>
                </div>

                <div className="op-detail-item">
                    <span className="op-detail-label">PRIORITY</span>
                    <span className={`op-priority-badge priority-${request.priority?.toLowerCase()}`}>
                        {request.priority}
                    </span>
                </div>

                <div className="op-detail-item">
                    <span className="op-detail-label">CATEGORY</span>
                    <span className="op-category-badge">
                        {request.categoryName}
                    </span>
                </div>

            </div>
        </div>

        {/* Request Information */}
        <div className="op-card op-info-card">

            <div className="op-card-header">
                <div>
                    <h2 className="op-card-title">
                        Request Information
                    </h2>

                    <p className="op-card-subtitle">
                        Basic information about this request.
                    </p>
                </div>
            </div>

            <div className="op-info-grid">

                <div className="op-info-item">
                    <span className="op-info-label">Request ID</span>
                    <span className="op-info-value">
                        #{request.id}
                    </span>
                </div>

                <div className="op-info-item">
                    <span className="op-info-label">Created by</span>
                    <span className="op-info-value">
                        {request.requesterName}
                    </span>
                </div>

                <div className="op-info-item">
                    <span className="op-info-label">Created date</span>
                    <span className="op-info-value">
                        {request.createdAt}
                    </span>
                </div>

                <div className="op-info-item">
                    <span className="op-info-label">Last updated</span>
                    <span className="op-info-value">
                        {request.updatedAt}
                    </span>
                </div>

            </div>
        </div>
    </div>
);
}

export default RequestDetails;