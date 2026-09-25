import { Link } from "react-router-dom";

function AdminDashboard() {
    const modules = [
        {
            title: "Requests",
            description: "Review and manage requests submitted by organization users.",
            path: "/admin/requests",
            icon: "↗",
        },
        {
            title: "Users",
            description: "View users, manage their status and assign departments.",
            path: "/admin/users",
            icon: "◎",
        },
        {
            title: "Departments",
            description: "Create and manage departments in your organization.",
            path: "/admin/departments",
            icon: "▦",
        },
        {
            title: "Categories",
            description: "Configure categories used when users create requests.",
            path: "/admin/categories",
            icon: "◇",
        },
        {
            title: "Organization",
            description: "Manage your organization's basic information and settings.",
            path: "/admin/organization",
            icon: "□",
        },
    ];

    return (
        <div className="op-page">

            {/* Header */}
            <div className="op-dashboard-hero">
                <div>
                    <span className="op-eyebrow">ADMINISTRATION</span>

                    <h1 className="op-page-title">
                        Admin Dashboard
                    </h1>

                    <p className="op-page-subtitle">
                        Manage your organization, users, requests and operational settings.
                    </p>
                </div>

                <div className="op-dashboard-mark">
                    O
                </div>
            </div>

            {/* Quick Overview */}
            <div className="op-section-heading">
                <div>
                    <h2>Workspace</h2>
                    <p>Quick access to your organization's management tools.</p>
                </div>
            </div>

            {/* Module Cards */}
            <div className="row g-4">

                {modules.map((module) => (
                    <div
                        className="col-12 col-md-6 col-xl-4"
                        key={module.title}
                    >
                        <Link
                            to={module.path}
                            className="op-admin-module text-decoration-none"
                        >
                            <div className="op-module-icon">
                                {module.icon}
                            </div>

                            <div className="op-module-content">
                                <h3>{module.title}</h3>

                                <p>
                                    {module.description}
                                </p>

                                <span className="op-module-link">
                                    Open {module.title}
                                    <span>→</span>
                                </span>
                            </div>
                        </Link>
                    </div>
                ))}

            </div>

            {/* Information Panel */}
            <div className="op-admin-info">
                <div className="op-admin-info-icon">
                    i
                </div>

                <div>
                    <h3>Organization administration</h3>

                    <p>
                        Use the workspace modules above to configure your
                        organization and manage day-to-day requests.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default AdminDashboard;