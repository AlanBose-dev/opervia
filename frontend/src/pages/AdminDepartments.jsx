import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDepartments() {
    const [departments, setDepartments] = useState([]);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    async function loadDepartments() {
        try {
            const response = await api.get("/departments");
            setDepartments(response.data);
        } catch (error) {
            console.error("Failed to load departments:", error);
            setMessage("Failed to load departments.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadDepartments();
    }, []);

    async function handleCreateDepartment(event) {
        event.preventDefault();

        try {
            await api.post("/departments", {
                name: name
            });

            setName("");
            setMessage("Department created successfully!");

            await loadDepartments();
        } catch (error) {
            console.error("Failed to create department:", error);
            setMessage("Failed to create department.");
        }
    }

    return (
        <div className="op-page">

            {/* Header */}
            <div className="op-page-header">
                <div>
                    <div className="op-page-eyebrow">
                        ORGANIZATION
                    </div>

                    <h1 className="op-page-title">
                        Departments
                    </h1>

                    <p className="op-page-subtitle">
                        Organize users into departments within your organization.
                    </p>
                </div>
            </div>

            {/* Create Department */}
            <div className="op-card op-info-card">

                <div className="op-card-header">
                    <h2 className="op-card-title">
                        Add Department
                    </h2>

                    <p className="op-card-subtitle">
                        Create a department for your organization.
                    </p>
                </div>

                <form
                    onSubmit={handleCreateDepartment}
                    className="op-user-invite-form"
                >
                    <div className="op-form-field">

                        <label className="op-form-label">
                            Department Name
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="e.g. Computer Science"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Add Department
                    </button>
                </form>

                {message && (
                    <div className="alert alert-info mt-3 mb-0">
                        {message}
                    </div>
                )}

            </div>

            {/* Department List */}
            <div className="op-card op-info-card">

                <div className="op-card-header">
                    <h2 className="op-card-title">
                        Departments List
                    </h2>

                    <p className="op-card-subtitle">
                        Departments available in your organization.
                    </p>
                </div>

                {loading ? (
                    <div className="op-empty-state">
                        Loading departments...
                    </div>
                ) : departments.length === 0 ? (
                    <div className="op-empty-state">
                        No departments created yet.
                    </div>
                ) : (
                    <div className="op-department-list">

                        {departments.map((department) => (
                            <div
                                key={department.id}
                                className="op-department-item"
                            >
                                <div>
                                    <div className="op-department-name">
                                        {department.name}
                                    </div>

                                    <div className="op-department-id">
                                        Department ID: #{department.id}
                                    </div>
                                </div>

                                <span className="op-category-badge">
                                    Department
                                </span>
                            </div>
                        ))}

                    </div>
                )}

            </div>

        </div>
    );
}

export default AdminDepartments;