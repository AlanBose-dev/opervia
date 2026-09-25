import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
    return (
        <div className="landing-page">

            {/* Navbar */}
            <nav className="landing-navbar">
                <div className="landing-container landing-nav-inner">

                    <Link to="/" className="landing-brand">
                        <span className="landing-brand-mark">O</span>
                        <span>Opervia</span>
                    </Link>

                    <div className="landing-nav-links">
                        <a href="#features">Features</a>
                        <a href="#how-it-works">How It Works</a>
                        <a href="#organizations">For Organizations</a>
                        <a href="#about">About</a>
                    </div>

                    <div className="landing-nav-actions">
                        <Link to="/login" className="landing-login">
                            Login
                        </Link>

                        <Link to="/register" className="landing-primary-btn">
                            Get Started
                        </Link>
                    </div>

                </div>
            </nav>


            {/* Hero */}
            <section className="landing-hero">
                <div className="landing-container landing-hero-grid">

                    <div className="landing-hero-content">
                        <span className="landing-eyebrow">
                            INTERNAL OPERATIONS PLATFORM
                        </span>

                        <h1>
                            Make internal operations
                            <span> simple and organized.</span>
                        </h1>

                        <p>
                            Opervia helps organizations manage internal
                            requests, teams, departments, and workflows
                            through one centralized platform.
                        </p>

                        <div className="landing-hero-actions">
                            <Link
                                to="/register"
                                className="landing-primary-btn landing-large-btn"
                            >
                                Create Organization
                                <span>→</span>
                            </Link>

                            <Link
                                to="/login"
                                className="landing-secondary-btn landing-large-btn"
                            >
                                Sign In
                            </Link>
                        </div>

                        <div className="landing-trust">
                            <span>✓</span>
                            Built for organized internal operations
                        </div>
                    </div>


                    {/* Product Preview */}
                    <div className="landing-preview-wrapper">
                        <div className="landing-preview">

                            <div className="preview-sidebar">
                                <div className="preview-logo">
                                    <span>O</span>
                                    Opervia
                                </div>

                                <div className="preview-nav active">
                                    <span>▦</span>
                                    Dashboard
                                </div>

                                <div className="preview-nav">
                                    <span>☷</span>
                                    Requests
                                </div>

                                <div className="preview-nav">
                                    <span>♙</span>
                                    Users
                                </div>

                                <div className="preview-nav">
                                    <span>⚙</span>
                                    Settings
                                </div>
                            </div>

                            <div className="preview-main">

                                <div className="preview-header">
                                    <div>
                                        <small>Workspace</small>
                                        <strong>Dashboard</strong>
                                    </div>

                                    <div className="preview-avatar">
                                        U
                                    </div>
                                </div>

                                <div className="preview-title">
                                    <strong>Request Overview</strong>
                                    <span>Today</span>
                                </div>

                                <div className="preview-stats">
                                    <div>
                                        <small>Total Requests</small>
                                        <strong>128</strong>
                                    </div>

                                    <div>
                                        <small>Open</small>
                                        <strong>24</strong>
                                    </div>

                                    <div>
                                        <small>Resolved</small>
                                        <strong>86</strong>
                                    </div>
                                </div>

                                <div className="preview-request-list">

                                    <div className="preview-request">
                                        <div>
                                            <strong>IT Support Request</strong>
                                            <small>Technical Support</small>
                                        </div>

                                        <span className="preview-status open">
                                            Open
                                        </span>
                                    </div>

                                    <div className="preview-request">
                                        <div>
                                            <strong>Leave Request</strong>
                                            <small>Human Resources</small>
                                        </div>

                                        <span className="preview-status progress">
                                            In Progress
                                        </span>
                                    </div>

                                    <div className="preview-request">
                                        <div>
                                            <strong>Equipment Request</strong>
                                            <small>Administration</small>
                                        </div>

                                        <span className="preview-status resolved">
                                            Resolved
                                        </span>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </section>


            {/* Features */}
            <section
                id="features"
                className="landing-section landing-features"
            >
                <div className="landing-container">

                    <div className="landing-section-heading">
                        <span className="landing-eyebrow">
                            PLATFORM
                        </span>

                        <h2>
                            Everything your organization needs
                        </h2>

                        <p>
                            A centralized workspace for managing everyday
                            internal operations.
                        </p>
                    </div>

                    <div className="landing-feature-grid">

                        <div className="landing-feature-card">
                            <div className="feature-icon">◫</div>
                            <h3>Request Management</h3>
                            <p>
                                Create, track, update, and resolve internal
                                requests from one place.
                            </p>
                        </div>

                        <div className="landing-feature-card">
                            <div className="feature-icon">♙</div>
                            <h3>Organization Management</h3>
                            <p>
                                Manage users, departments, categories, and
                                organization settings.
                            </p>
                        </div>

                        <div className="landing-feature-card">
                            <div className="feature-icon">↻</div>
                            <h3>Clear Workflows</h3>
                            <p>
                                Keep request progress visible from creation
                                through resolution and closure.
                            </p>
                        </div>

                        <div className="landing-feature-card">
                            <div className="feature-icon">⌁</div>
                            <h3>Activity History</h3>
                            <p>
                                Maintain a clear history of important request
                                activities and changes.
                            </p>
                        </div>

                        <div className="landing-feature-card">
                            <div className="feature-icon">⌕</div>
                            <h3>Search & Organization</h3>
                            <p>
                                Find and organize requests efficiently using
                                structured information.
                            </p>
                        </div>

                        <div className="landing-feature-card">
                            <div className="feature-icon">◉</div>
                            <h3>Role-Based Access</h3>
                            <p>
                                Separate administrative and member experiences
                                within each organization.
                            </p>
                        </div>

                    </div>
                </div>
            </section>


            {/* How it works */}
            <section
                id="how-it-works"
                className="landing-section landing-workflow"
            >
                <div className="landing-container">

                    <div className="landing-section-heading">
                        <span className="landing-eyebrow">
                            HOW IT WORKS
                        </span>

                        <h2>
                            A simple internal workflow
                        </h2>

                        <p>
                            Opervia brings everyday organizational requests
                            into one structured process.
                        </p>
                    </div>

                    <div className="landing-steps">

                        <div className="landing-step">
                            <span>01</span>
                            <h3>Create</h3>
                            <p>
                                A member submits an internal request with the
                                required details.
                            </p>
                        </div>

                        <div className="landing-step">
                            <span>02</span>
                            <h3>Manage</h3>
                            <p>
                                Administrators review and manage requests
                                through their organization workspace.
                            </p>
                        </div>

                        <div className="landing-step">
                            <span>03</span>
                            <h3>Resolve</h3>
                            <p>
                                Requests move through their workflow until
                                the issue is resolved and closed.
                            </p>
                        </div>

                    </div>

                </div>
            </section>


            {/* Organizations */}
            <section
                id="organizations"
                className="landing-section landing-organizations"
            >
                <div className="landing-container landing-org-grid">

                    <div>
                        <span className="landing-eyebrow">
                            BUILT FOR ORGANIZATIONS
                        </span>

                        <h2>
                            One platform for different
                            internal environments.
                        </h2>

                        <p>
                            Opervia can provide a structured internal
                            operations workflow for organizations with
                            different teams, departments, and everyday
                            service needs.
                        </p>
                    </div>

                    <div className="landing-org-list">
                        <div>Education</div>
                        <div>Companies</div>
                        <div>Healthcare</div>
                        <div>Non-profit Organizations</div>
                        <div>Hostels & Communities</div>
                        <div>Other Organizations</div>
                    </div>

                </div>
            </section>


            {/* CTA */}
            <section id="about" className="landing-cta">
                <div className="landing-container">

                    <div className="landing-cta-inner">
                        <div>
                            <span className="landing-eyebrow">
                                GET STARTED
                            </span>

                            <h2>
                                Bring your internal operations
                                into one workspace.
                            </h2>

                            <p>
                                Create your organization and start building
                                a more structured request workflow.
                            </p>
                        </div>

                        <Link
                            to="/register"
                            className="landing-primary-btn landing-large-btn"
                        >
                            Create Organization
                            <span>→</span>
                        </Link>
                    </div>

                </div>
            </section>


            {/* Footer */}
            <footer className="landing-footer">
                <div className="landing-container landing-footer-inner">

                    <div className="landing-footer-brand">
                        <span className="landing-brand-mark">O</span>
                        <div>
                            <strong>Opervia</strong>
                            <span>Internal Operations Platform</span>
                        </div>
                    </div>

                    <div className="landing-footer-links">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Get Started</Link>
                        <Link to="/join">Join Organization</Link>
                    </div>

                    <div className="landing-footer-copy">
                        © {new Date().getFullYear()} Opervia
                    </div>

                </div>
            </footer>

        </div>
    );
}

export default LandingPage;