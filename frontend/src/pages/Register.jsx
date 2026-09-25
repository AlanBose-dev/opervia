import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./register.css";

function Register() {
    const [organizationName, setOrganizationName] = useState("");
    const [organizationEmail, setOrganizationEmail] = useState("");
    const [contact, setContact] = useState("");

    const [adminUsername, setAdminUsername] = useState("");
    const [adminEmail, setAdminEmail] = useState("");
    const [adminPassword, setAdminPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    async function handleRegister(event) {
        event.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await api.post("/organizations", {
                name: organizationName,
                email: organizationEmail,
                contact: contact,
                adminUsername: adminUsername,
                adminEmail: adminEmail,
                adminPassword: adminPassword
            });

            console.log("Organization created:", response.data);

            setSuccess(
                "Organization created successfully. You can now sign in."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {
            console.error("Organization creation failed:", error);

            if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (!error.response) {
                setError(
                    "Unable to connect to the server. Please try again."
                );
            } else {
                setError(
                    "Unable to create the organization. Please check your details."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register-page">

            <div className="register-container">

                {/* Information Panel */}

                <section className="register-info">

                    <Link to="/" className="register-brand">
                        <span className="register-brand-mark">O</span>
                        <span>Opervia</span>
                    </Link>

                    <div className="register-info-content">

                        <span className="register-eyebrow">
                            GET STARTED WITH OPERVIA
                        </span>

                        <h1>
                            Build your organization's
                            <span> internal workspace.</span>
                        </h1>

                        <p>
                            Create your organization and its first
                            administrator account. You can invite members
                            and configure your workspace after signing in.
                        </p>

                    </div>

                    <div className="register-info-footer">
                        <span>Organization</span>
                        <span>•</span>
                        <span>Administration</span>
                        <span>•</span>
                        <span>Operations</span>
                    </div>

                </section>


                {/* Form Panel */}

                <section className="register-panel">

                    <div className="register-card">

                        <div className="register-header">

                            <span className="register-mobile-logo">
                                O
                            </span>

                            <h2>
                                Create your organization
                            </h2>

                            <p>
                                Set up your Opervia workspace
                            </p>

                        </div>


                        {error && (
                            <div
                                className="register-message register-error"
                                role="alert"
                            >
                                <span>!</span>
                                <p>{error}</p>
                            </div>
                        )}


                        {success && (
                            <div
                                className="register-message register-success"
                                role="status"
                            >
                                <span>✓</span>
                                <p>{success}</p>
                            </div>
                        )}


                        <form
                            onSubmit={handleRegister}
                            className="register-form"
                        >

                            {/* Organization */}

                            <div className="register-section-title">
                                Organization details
                            </div>

                            <div className="register-field">

                                <label htmlFor="organizationName">
                                    Organization name
                                </label>

                                <input
                                    id="organizationName"
                                    type="text"
                                    placeholder="Enter organization name"
                                    value={organizationName}
                                    onChange={(event) =>
                                        setOrganizationName(event.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="register-field">

                                <label htmlFor="organizationEmail">
                                    Organization email
                                </label>

                                <input
                                    id="organizationEmail"
                                    type="email"
                                    placeholder="organization@example.com"
                                    value={organizationEmail}
                                    onChange={(event) =>
                                        setOrganizationEmail(event.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="register-field">

                                <label htmlFor="contact">
                                    Contact
                                </label>

                                <input
                                    id="contact"
                                    type="text"
                                    placeholder="Enter contact number"
                                    value={contact}
                                    onChange={(event) =>
                                        setContact(event.target.value)
                                    }
                                    required
                                />

                            </div>


                            {/* Administrator */}

                            <div className="register-section-title register-admin-title">
                                Administrator account
                            </div>

                            <div className="register-field">

                                <label htmlFor="adminUsername">
                                    Username
                                </label>

                                <input
                                    id="adminUsername"
                                    type="text"
                                    placeholder="Choose an admin username"
                                    value={adminUsername}
                                    onChange={(event) =>
                                        setAdminUsername(event.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="register-field">

                                <label htmlFor="adminEmail">
                                    Admin email
                                </label>

                                <input
                                    id="adminEmail"
                                    type="email"
                                    placeholder="admin@example.com"
                                    value={adminEmail}
                                    onChange={(event) =>
                                        setAdminEmail(event.target.value)
                                    }
                                    required
                                />

                            </div>


                            <div className="register-field">

                                <label htmlFor="adminPassword">
                                    Password
                                </label>

                                <input
                                    id="adminPassword"
                                    type="password"
                                    placeholder="Create a password"
                                    value={adminPassword}
                                    onChange={(event) =>
                                        setAdminPassword(event.target.value)
                                    }
                                    required
                                    autoComplete="new-password"
                                />

                            </div>


                            <button
                                type="submit"
                                className="register-button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="register-spinner"></span>
                                        Creating organization...
                                    </>
                                ) : (
                                    <>
                                        Create Organization
                                        <span>→</span>
                                    </>
                                )}
                            </button>

                        </form>


                        <div className="register-login">

                            <span>
                                Already have an account?
                            </span>

                            <Link to="/login">
                                Sign in
                            </Link>

                        </div>


                        <div className="register-join">

                            <span>
                                Already invited to an organization?
                            </span>

                            <Link to="/join">
                                Join organization
                            </Link>

                        </div>

                    </div>


                    <div className="register-footer">
                        © {new Date().getFullYear()} Opervia. All rights reserved.
                    </div>

                </section>

            </div>

        </div>
    );
}

export default Register;