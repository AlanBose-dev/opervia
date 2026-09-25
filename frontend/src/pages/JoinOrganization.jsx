import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./JoinOrganization.css";

function JoinOrganization() {
    const [token, setToken] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleJoin(event) {
        event.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await api.post(
                "/admin/invitations/register",
                {
                    token: token,
                    username: username,
                    password: password
                }
            );

            console.log("User registered:", response.data);

            setMessage("Organization joined successfully!");

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (error) {
            console.error("Join organization failed:", error);

            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else if (!error.response) {
                setMessage("Unable to connect to the server. Please try again.");
            } else {
                setMessage("Failed to join organization. Please check your details.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="join-page">

            <div className="join-brand-panel">
                <div className="join-brand-content">
                    <div className="join-logo">O</div>

                    <h1>Join your organization.</h1>

                    <p>
                        Use the invitation token provided by your organization
                        administrator to create your Opervia account.
                    </p>

                    <div className="join-info-list">
                        <div>
                            <span>01</span>
                            <p>Enter your invitation token</p>
                        </div>

                        <div>
                            <span>02</span>
                            <p>Create your account credentials</p>
                        </div>

                        <div>
                            <span>03</span>
                            <p>Sign in and access your workspace</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="join-form-panel">

                <div className="join-form-container">

                    <div className="join-mobile-logo">
                        <div className="join-logo">O</div>
                        <span>Opervia</span>
                    </div>

                    <div className="join-heading">
                        <span className="join-eyebrow">
                            INVITATION
                        </span>

                        <h2>Join Organization</h2>

                        <p>
                            Create your account using the invitation
                            provided by your administrator.
                        </p>
                    </div>


                    <form onSubmit={handleJoin}>

                        <div className="join-field">
                            <label htmlFor="token">
                                Invitation Token
                            </label>

                            <input
                                id="token"
                                type="text"
                                value={token}
                                onChange={(event) =>
                                    setToken(event.target.value)
                                }
                                placeholder="Enter your invitation token"
                                required
                            />

                            <small>
                                Ask your organization administrator for
                                the invitation token.
                            </small>
                        </div>


                        <div className="join-field">
                            <label htmlFor="username">
                                Username
                            </label>

                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                placeholder="Choose a username"
                                required
                            />
                        </div>


                        <div className="join-field">
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(event.target.value)
                                }
                                placeholder="Create a password"
                                required
                            />
                        </div>


                        {message && (
                            <div
                                className={`join-message ${
                                    message.includes("successfully")
                                        ? "join-success"
                                        : "join-error"
                                }`}
                            >
                                {message}
                            </div>
                        )}


                        <button
                            type="submit"
                            className="join-submit"
                            disabled={loading}
                        >
                            {loading ? "Joining..." : "Join Organization"}
                        </button>

                    </form>


                    <div className="join-footer">

                        <p>
                            Already have an account?{" "}
                            <Link to="/login">
                                Sign in
                            </Link>
                        </p>

                        <p>
                            Need to create an organization?{" "}
                            <Link to="/register">
                                Get started
                            </Link>
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default JoinOrganization;