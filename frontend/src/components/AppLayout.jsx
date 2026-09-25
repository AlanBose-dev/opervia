import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import TopHeader from "./TopHeader";

function AppLayout({ isAdmin = false }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className={`op-app ${sidebarOpen ? "sidebar-open" : ""}`}>
            <Sidebar
                isAdmin={isAdmin}
                onNavigate={closeSidebar}
            />

            {sidebarOpen && (
                <div
                    className="op-sidebar-overlay"
                    onClick={closeSidebar}
                />
            )}

            <div className="op-main">
                <TopHeader
                    isAdmin={isAdmin}
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="op-content">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AppLayout;