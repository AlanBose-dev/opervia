import { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [organization, setOrganization] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadProfile() {
        try {
            const profileResponse = await api.get("/user/profile");

            setProfile(profileResponse.data);

            if (profileResponse.data.organizationId) {
                const organizationResponse = await api.get(
                    `/organizations/${profileResponse.data.organizationId}`
                );

                setOrganization(organizationResponse.data);
            }
        } catch (error) {
            console.error("Failed to load profile:", error);
            setError("Failed to load profile details.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="op-empty-card">
                <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="mb-0">
                    Loading profile...
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

    return (
        <div className="op-page">

            {/* Header */}
            <div className="op-page-header">
                <div>
                    <span className="op-eyebrow">
                        ACCOUNT
                    </span>

                    <h1 className="op-page-title">
                        My Profile
                    </h1>

                    <p className="op-page-subtitle">
                        View your account and organization information.
                    </p>
                </div>
            </div>

            <div className="row g-4">

                {/* Personal Information */}
                <div className="col-12 col-xl-7">
                    <div className="op-profile-card">

                        <div className="op-profile-card-header">
                            <div className="op-profile-avatar">
                                {profile?.username
                                    ? profile.username.charAt(0).toUpperCase()
                                    : "U"}
                            </div>

                            <div>
                                <h2>
                                    {profile?.username || "User"}
                                </h2>

                                <p>
                                    {profile?.role || "USER"}
                                </p>
                            </div>
                        </div>

                        <div className="op-profile-details">

                            <div className="op-profile-detail">
                                <span>Username</span>
                                <strong>
                                    {profile?.username || "Not available"}
                                </strong>
                            </div>

                            <div className="op-profile-detail">
                                <span>Email</span>
                                <strong>
                                    {profile?.email || "Not available"}
                                </strong>
                            </div>

                            <div className="op-profile-detail">
                                <span>Contact</span>
                                <strong>
                                    {profile?.contact || "Not available"}
                                </strong>
                            </div>

                            <div className="op-profile-detail">
                                <span>Role</span>
                                <strong>
                                    {profile?.role || "Not available"}
                                </strong>
                            </div>

                            <div className="op-profile-detail">
                                <span>Department</span>
                                <strong>
                                    {profile?.departmentName || "Not assigned"}
                                </strong>
                            </div>

                            <div className="op-profile-detail">
                                <span>Account Status</span>

                                <strong>
                                    <span
                                        className={
                                            profile?.status
                                                ? "op-profile-status active"
                                                : "op-profile-status inactive"
                                        }
                                    >
                                        {profile?.status
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </strong>
                            </div>

                        </div>

                    </div>
                </div>

                {/* Organization */}
                <div className="col-12 col-xl-5">
                    <div className="op-profile-card">

                        <div className="op-profile-section-header">
                            <div>
                                <h2>Organization</h2>

                                <p>
                                    Organization you're associated with.
                                </p>
                            </div>
                        </div>

                        {organization ? (
                            <div className="op-profile-details">

                                <div className="op-profile-detail">
                                    <span>Organization Name</span>
                                    <strong>
                                        {organization.name}
                                    </strong>
                                </div>

                                <div className="op-profile-detail">
                                    <span>Email</span>
                                    <strong>
                                        {organization.email}
                                    </strong>
                                </div>

                                <div className="op-profile-detail">
                                    <span>Contact</span>
                                    <strong>
                                        {organization.contact}
                                    </strong>
                                </div>

                                <div className="op-profile-detail">
                                    <span>Organization ID</span>
                                    <strong>
                                        #{organization.id}
                                    </strong>
                                </div>

                            </div>
                        ) : (
                            <div className="op-profile-no-org">
                                No organization information available.
                            </div>
                        )}

                    </div>
                </div>

            </div>

        </div>
    );
}

export default Profile;