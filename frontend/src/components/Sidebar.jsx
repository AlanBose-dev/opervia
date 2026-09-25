import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Sidebar({ isAdmin = false, onNavigate }) {
    const navigate = useNavigate();

const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    onNavigate?.();
};
    const userLinks = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: "▦",
        },
        {
            label: "My Requests",
            path: "/requests",
            icon: "☷",
        },
        {
            label: "Create Request",
            path: "/requests/create",
            icon: "+",
        },
    ];

    const adminLinks = [
        {
            label: "Dashboard",
            path: "/admin/dashboard",
            icon: "▦",
        },
        {
            label: "Requests",
            path: "/admin/requests",
            icon: "☷",
        },
        {
            label: "Users",
            path: "/admin/users",
            icon: "♙",
        },
        {
            label: "Departments",
            path: "/admin/departments",
            icon: "▤",
        },
        {
            label: "Categories",
            path: "/admin/categories",
            icon: "◫",
        },
        {
            label: "Organization",
            path: "/admin/organization",
            icon: "⚙",
        },
        
    ];

    const links = isAdmin ? adminLinks : userLinks;

    return (
        <aside className="op-sidebar">
            <div className="op-sidebar-brand">
                <div className="op-brand-mark">O</div>

                <div className="op-brand-text">
                    <span className="op-brand-name">Opervia</span>
                    <span className="op-brand-subtitle">
                        Internal Operations
                    </span>
                </div>
            </div>

            <nav className="op-sidebar-nav">
                <div className="op-nav-section">
                    <span className="op-nav-title">
                        {isAdmin ? "Administration" : "Workspace"}
                    </span>

                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            onClick={onNavigate}
                            className={({ isActive }) =>
                                `op-nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            <span className="op-nav-icon">
                                {link.icon}
                            </span>

                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>

           <div className="op-sidebar-footer">
    <button
        type="button"
        className="op-logout-button"
        onClick={handleLogout}
    >
        <span className="op-nav-icon">↪</span>
        <span>Logout</span>
    </button>

    <div className="op-sidebar-version">
        <span>Opervia</span>
        <span>v1.0</span>
    </div>
</div>
        </aside>
    );
}

export default Sidebar;