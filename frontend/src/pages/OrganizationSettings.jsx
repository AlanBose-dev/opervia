import { useEffect, useState } from "react";
import api from "../services/api";

function OrganizationSettings() {
    const [organization, setOrganization] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadOrganization() {
        try {
            const response = await api.get("/admin/organization");
            setOrganization(response.data);
        } catch (error) {
            console.error("Failed to load organization:", error);
            setError("Failed to load organization details.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadOrganization();
    }, []);

    if (loading) {
        return (
            <div className="op-empty-card">
                <div className="spinner-border text-primary mb-3" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>

                <p className="mb-0">
                    Loading organization details...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                {error}
            </div>
        );
    }

    if (!organization) {
        return (
            <div className="op-empty-card">
                <h5>Organization not found</h5>
            </div>
        );
    }

    return (
        <div className="op-page">

            {/* Header */}
            <div className="op-page-header">
                <div>
                    <span className="op-eyebrow">
                        ORGANIZATION
                    </span>

                    <h1 className="op-page-title">
                        Organization Settings
                    </h1>

                    <p className="op-page-subtitle">
                        View your organization's basic information.
                    </p>
                </div>
            </div>

            {/* Organization Card */}
            <div className="op-organization-card">

                <div className="op-organization-card-header">
                    <div>
                        <h2>Organization Details</h2>
                        <p>
                            Information associated with your organization.
                        </p>
                    </div>

                    <div className="op-organization-badge">
                        ACTIVE
                    </div>
                </div>

                <div className="op-organization-grid">

                    <div className="op-detail-item">
                        <span>Organization Name</span>
                        <strong>
                            {organization.name || "Not available"}
                        </strong>
                    </div>

                    <div className="op-detail-item">
                        <span>Organization Email</span>
                        <strong>
                            {organization.email || "Not available"}
                        </strong>
                    </div>

                    <div className="op-detail-item">
                        <span>Contact</span>
                        <strong>
                            {organization.contact || "Not available"}
                        </strong>
                    </div>

                    <div className="op-detail-item">
                        <span>Organization ID</span>
                        <strong>
                            #{organization.id}
                        </strong>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default OrganizationSettings;