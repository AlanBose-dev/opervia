import { useEffect, useState } from "react";
import api from "../services/api";
import "./dashboard.css";

function Dashboard() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDashboard();
    }, []);

    async function fetchDashboard() {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/user/requests/dashboard");

            setDashboard(response.data);
        } catch (error) {
            console.error("Failed to load dashboard:", error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (!error.response) {
                setError("Unable to connect to the server.");
            } else {
                setError("Unable to load dashboard.");
            }
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-loading">
                    <div className="dashboard-spinner"></div>
                    <p>Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-error">
                    <div className="dashboard-error-icon">!</div>

                    <div>
                        <h3>Unable to load dashboard</h3>
                        <p>{error}</p>

                        <button
                            type="button"
                            className="dashboard-retry"
                            onClick={fetchDashboard}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!dashboard) {
        return null;
    }

    const stats = [
        {
            label: "Total Requests",
            value: dashboard.totalRequests,
            icon: "▦",
            className: "total",
        },
        {
            label: "Open",
            value: dashboard.openRequests,
            icon: "○",
            className: "open",
        },
        {
            label: "In Progress",
            value: dashboard.inProgressRequests,
            icon: "◌",
            className: "progress",
        },
        {
            label: "Resolved",
            value: dashboard.resolvedRequests,
            icon: "✓",
            className: "resolved",
        },
        {
            label: "Closed",
            value: dashboard.closedRequests,
            icon: "■",
            className: "closed",
        },
        {
            label: "Reopened",
            value: dashboard.reopenedRequests,
            icon: "↻",
            className: "reopened",
        },
    ];

    return (
        <div className="dashboard-page">

            {/* Header */}

            <div className="dashboard-header">

                <div>
                    <p className="dashboard-eyebrow">
                        WORKSPACE
                    </p>

                    <h1>Dashboard</h1>

                    <p className="dashboard-subtitle">
                        Overview of your requests and activity.
                    </p>
                </div>

                <div className="dashboard-status">
                    <span></span>
                    Workspace active
                </div>

            </div>


            {/* Statistics */}

            <section className="dashboard-section">

                <div className="dashboard-section-heading">
                    <div>
                        <h2>Request Overview</h2>
                        <p>Your current request activity at a glance.</p>
                    </div>
                </div>

                <div className="dashboard-stats">

                    {stats.map((stat) => (
                        <div
                            className={`dashboard-stat-card ${stat.className}`}
                            key={stat.label}
                        >

                            <div className="dashboard-stat-top">

                                <div className="dashboard-stat-icon">
                                    {stat.icon}
                                </div>

                                <span className="dashboard-stat-label">
                                    {stat.label}
                                </span>

                            </div>

                            <div className="dashboard-stat-value">
                                {stat.value}
                            </div>

                        </div>
                    ))}

                </div>

            </section>


            {/* Status Summary */}

            <section className="dashboard-summary-card">

                <div className="dashboard-summary-header">

                    <div>
                        <h2>Status Summary</h2>

                        <p>
                            Distribution of your requests by current status.
                        </p>
                    </div>

                    <div className="dashboard-total">
                        {dashboard.totalRequests} total
                    </div>

                </div>


                <div className="dashboard-summary-list">

                    <div className="dashboard-summary-row">
                        <div className="dashboard-summary-name">
                            <span className="summary-dot open-dot"></span>
                            Open
                        </div>

                        <strong>{dashboard.openRequests}</strong>
                    </div>


                    <div className="dashboard-summary-row">
                        <div className="dashboard-summary-name">
                            <span className="summary-dot progress-dot"></span>
                            In Progress
                        </div>

                        <strong>{dashboard.inProgressRequests}</strong>
                    </div>


                    <div className="dashboard-summary-row">
                        <div className="dashboard-summary-name">
                            <span className="summary-dot resolved-dot"></span>
                            Resolved
                        </div>

                        <strong>{dashboard.resolvedRequests}</strong>
                    </div>


                    <div className="dashboard-summary-row">
                        <div className="dashboard-summary-name">
                            <span className="summary-dot closed-dot"></span>
                            Closed
                        </div>

                        <strong>{dashboard.closedRequests}</strong>
                    </div>


                    <div className="dashboard-summary-row">
                        <div className="dashboard-summary-name">
                            <span className="summary-dot reopened-dot"></span>
                            Reopened
                        </div>

                        <strong>{dashboard.reopenedRequests}</strong>
                    </div>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;