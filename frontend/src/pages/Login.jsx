import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/users/login", {
                email: email,
                password: password
            });

            const token = response.data;

            localStorage.setItem("token", token);

            try {
                await api.get("/admin/test");
                navigate("/admin/dashboard");
            } catch (error) {
                if (error.response?.status === 403) {
                    navigate("/dashboard");
                } else {
                    console.error("Admin check failed:", error);
                    setError("Unable to verify your account.");
                }
            }
        } catch (error) {
            console.error("Login failed:", error);

            if (error.response?.status === 401) {
                setError("Invalid email or password.");
            } else if (!error.response) {
                setError(
                    "Unable to connect to the server. Please try again."
                );
            } else {
                setError("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="login-page">

            <div className="login-container">

                {/* Left Information Panel */}
                <section className="login-info">

                    <Link to="/" className="login-brand">
                        <span className="login-brand-mark">O</span>
                        <span>Opervia</span>
                    </Link>

                    <div className="login-info-content">
                        <span className="login-eyebrow">
                            INTERNAL OPERATIONS PLATFORM
                        </span>

                        <h1>
                            Your organization's
                            <span> operations,</span>
                            <br />
                            in one place.
                        </h1>

                        <p>
                            Manage internal requests, workflows,
                            departments, and organizational activities
                            through one centralized workspace.
                        </p>
                    </div>

                    <div className="login-info-footer">
                        <span>Secure</span>
                        <span>•</span>
                        <span>Organized</span>
                        <span>•</span>
                        <span>Connected</span>
                    </div>

                </section>


                {/* Login Form */}
                <section className="login-panel">

                    <div className="login-card">

                        <div className="login-header">
                            <span className="login-mobile-logo">
                                O
                            </span>

                            <h2>Welcome back</h2>

                            <p>
                                Sign in to your Opervia account
                            </p>
                        </div>


                        {error && (
                            <div
                                className="login-error"
                                role="alert"
                            >
                                <span>!</span>
                                <p>{error}</p>
                            </div>
                        )}


                        <form
                            onSubmit={handleLogin}
                            className="login-form"
                        >

                            <div className="login-field">
                                <label htmlFor="email">
                                    Email address
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    required
                                    autoComplete="email"
                                />
                            </div>


                            <div className="login-field">
                                <label htmlFor="password">
                                    Password
                                </label>

                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    required
                                    autoComplete="current-password"
                                />
                            </div>


                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="login-spinner"></span>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        Sign in
                                        <span>→</span>
                                    </>
                                )}
                            </button>

                        </form>


                        <div className="login-register">
                            <span>
                                Don't have an organization?
                            </span>

                            <Link to="/register">
                                Create an organization
                            </Link>
                        </div>

                        <div className="login-join">
                            <span>
                                Already invited to an organization?
                            </span>

                            <Link to="/join">
                                Join organization
                            </Link>
                        </div>

                    </div>


                    <div className="login-footer">
                        © {new Date().getFullYear()} Opervia. All rights reserved.
                    </div>

                </section>

            </div>

        </div>
    );
}

export default Login;