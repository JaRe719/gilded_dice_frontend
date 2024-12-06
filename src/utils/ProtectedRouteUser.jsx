import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ token }) => {
    // Prüfe, ob ein Token vorhanden ist
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;