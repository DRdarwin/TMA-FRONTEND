// src/routes/AdminRoutes.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes: React.FC = () => {
    const adminToken = localStorage.getItem("adminToken");

    return adminToken ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoutes;
