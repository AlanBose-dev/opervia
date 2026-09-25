import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function TopHeader({ isAdmin = false, onMenuClick }) {
    const navigate = useNavigate();

    function openProfile() {
        navigate(isAdmin ? "/admin/profile" : "/profile");
    }

    return (
        <header className="op-top-header">

            <div className="op-header-left">

                <button
                    type="button"
                    className="op-mobile-menu"
                    onClick={onMenuClick}
                    aria-label="Open navigation"
                >
                    ☰
                </button>

                <div>
                    <span className="op-header-label">
                        {isAdmin ? "Administration" : "Workspace"}
                    </span>

                    <span className="op-header-title">
                        Opervia
                    </span>
                </div>

            </div>

            <div className="op-header-right">

                <ThemeToggle />

                <button
                    type="button"
                    className="op-user-menu"
                    onClick={openProfile}
                    aria-label="Open profile"
                >
                    <div className="op-user-avatar">
                        U
                    </div>

                    <div className="op-user-info">
                        <span className="op-user-name">
                            {isAdmin ? "Administrator" : "User"}
                        </span>

                        <span className="op-user-role">
                            {isAdmin ? "Admin" : "Member"}
                        </span>
                    </div>

                    <span className="op-profile-arrow">
                        →
                    </span>
                </button>

            </div>

        </header>
    );
}

export default TopHeader;