import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import JoinOrganization from "./pages/JoinOrganization";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MyRequests from "./pages/MyRequests";
import CreateRequest from "./pages/CreateRequest";
import RequestDetails from "./pages/RequestDetails";
import Comments from "./pages/Comments";
import ResolutionConfirmation from "./pages/ResolutionConfirmation";

import AdminDashboard from "./pages/AdminDashboard";
import OrganizationSettings from "./pages/OrganizationSettings";
import AdminUsers from "./pages/AdminUsers";
import AdminCategories from "./pages/AdminCategories";
import AdminDepartments from "./pages/AdminDepartments";
import AdminRequests from "./pages/AdminRequests";
import Profile from "./pages/Profile";
import AppLayout from "./components/AppLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                   ========================= */}
                   <Route path="/" element={<LandingPage />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/join" element={<JoinOrganization />} />


                {/* =========================
                    USER ROUTES
                   ========================= */}

                <Route element={<AppLayout isAdmin={false} />}>
<Route path="/profile" element={<Profile />} />
                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/requests"
                        element={<MyRequests />}
                    />

                    <Route
                        path="/requests/create"
                        element={<CreateRequest />}
                    />

                    <Route
                        path="/requests/:id"
                        element={<RequestDetails />}
                    />

                    <Route
                        path="/requests/:id/comments"
                        element={<Comments />}
                    />

                    <Route
                        path="/requests/:id/resolution"
                        element={<ResolutionConfirmation />}
                    />

                </Route>


                {/* =========================
                    ADMIN ROUTES
                   ========================= */}

                <Route element={<AppLayout isAdmin={true} />}>
<Route path="/admin/profile" element={<Profile />} />
                    <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                    />

                    <Route
                        path="/admin/requests"
                        element={<AdminRequests />}
                    />

                    <Route
                        path="/admin/users"
                        element={<AdminUsers />}
                    />

                    <Route
                        path="/admin/departments"
                        element={<AdminDepartments />}
                    />

                    <Route
                        path="/admin/categories"
                        element={<AdminCategories />}
                    />

                    <Route
                        path="/admin/organization"
                        element={<OrganizationSettings />}
                    />

                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;