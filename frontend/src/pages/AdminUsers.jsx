import { useEffect, useState } from "react";
import api from "../services/api";

function AdminUsers() {
    const [email, setEmail] = useState("");
    const [invitation, setInvitation] = useState(null);
    const [message, setMessage] = useState("");

    const [users, setUsers] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    async function loadData() {
        try {
            const [usersResponse, departmentsResponse] = await Promise.all([
                api.get("/admin/users"),
                api.get("/departments")
            ]);

            setUsers(usersResponse.data);
            setDepartments(departmentsResponse.data);
        } catch (error) {
            console.error("Failed to load users/departments:", error);
            setMessage("Failed to load users.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, []);

    async function handleInvite(event) {
        event.preventDefault();

        try {
            const response = await api.post(
                "/admin/invitations",
                null,
                {
                    params: {
                        email: email
                    }
                }
            );

            setInvitation(response.data);
            setMessage("Invitation created successfully!");
            setEmail("");
        } catch (error) {
            console.error("Invitation failed:", error);
            setMessage("Failed to create invitation.");
        }
    }

    async function handleStatusChange(user) {
        try {
            await api.put(
                `/admin/users/${user.id}/status`,
                null,
                {
                    params: {
                        status: !user.status
                    }
                }
            );

            await loadData();
        } catch (error) {
            console.error("Failed to update user status:", error);
            setMessage("Failed to update user status.");
        }
    }

    async function handleDepartmentChange(userId, departmentId) {
        try {
            await api.put(
                `/admin/users/${userId}/department`,
                null,
                {
                    params: {
                        departmentId: Number(departmentId)
                    }
                }
            );

            await loadData();
        } catch (error) {
            console.error("Failed to assign department:", error);
            setMessage("Failed to assign department.");
        }
    }

    return (
        <div className="op-page">

            {/* Page Header */}
            <div className="op-page-header">
                <div>
                    <div className="op-page-eyebrow">
                        ADMINISTRATION
                    </div>

                    <h1 className="op-page-title">
                        Users
                    </h1>

                    <p className="op-page-subtitle">
                        Manage users and their organization departments.
                    </p>
                </div>
            </div>

            {/* Invite User */}
            <div className="op-card op-info-card">

                <div className="op-card-header">
                    <h2 className="op-card-title">
                        Invite User
                    </h2>

                    <p className="op-card-subtitle">
                        Send an invitation to join your organization.
                    </p>
                </div>

                <form onSubmit={handleInvite} className="op-user-invite-form">

                    <div className="op-form-field">
                        <label className="op-form-label">
                            User Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="user@example.com"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Send Invitation
                    </button>

                </form>

                {message && (
                    <div className="alert alert-info mt-3 mb-0">
                        {message}
                    </div>
                )}

                {invitation && (
                    <div className="op-invitation-box mt-3">
                        <strong>Invitation Created</strong>

                        <div>
                            Email: {invitation.email}
                        </div>

                        <div>
                            Token: {invitation.token}
                        </div>
                    </div>
                )}

            </div>

            {/* Users */}
            <div className="op-card op-info-card">

                <div className="op-card-header">
                    <h2 className="op-card-title">
                        Organization Users
                    </h2>

                    <p className="op-card-subtitle">
                        Users belonging to your organization.
                    </p>
                </div>

                {loading ? (
                    <div className="op-empty-state">
                        Loading users...
                    </div>
                ) : users.length === 0 ? (
                    <div className="op-empty-state">
                        No users found.
                    </div>
                ) : (
                    <div className="table-responsive">

                        <table className="table op-users-table align-middle mb-0">

                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Department</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {users.map((user) => (
                                    <tr key={user.id}>

                                        <td>
                                            <div className="op-user-name">
                                                {user.username}
                                            </div>

                                            <div className="op-user-contact">
                                                {user.contact || "No contact"}
                                            </div>
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>
                                            <span className="op-category-badge">
                                                {user.role}
                                            </span>
                                        </td>

                                        <td>
                                            <select
                                                className="form-select form-select-sm"
                                                value={
                                                    user.departmentId || ""
                                                }
                                                onChange={(event) =>
                                                    handleDepartmentChange(
                                                        user.id,
                                                        event.target.value
                                                    )
                                                }
                                            >
                                                <option value="">
                                                    No Department
                                                </option>

                                                {departments.map(
                                                    (department) => (
                                                        <option
                                                            key={department.id}
                                                            value={department.id}
                                                        >
                                                            {department.name}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </td>

                                        <td>
                                            <span
                                                className={
                                                    user.status
                                                        ? "op-status-badge user-active"
                                                        : "op-status-badge user-inactive"
                                                }
                                            >
                                                <span className="op-status-dot"></span>

                                                {user.status
                                                    ? "Active"
                                                    : "Inactive"}
                                            </span>
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-secondary"
                                                onClick={() =>
                                                    handleStatusChange(user)
                                                }
                                            >
                                                {user.status
                                                    ? "Deactivate"
                                                    : "Activate"}
                                            </button>
                                        </td>

                                    </tr>
                                ))}

                            </tbody>

                        </table>

                    </div>
                )}

            </div>

        </div>
    );
}

export default AdminUsers;