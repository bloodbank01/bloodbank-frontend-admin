import React from 'react'
import { Navigate } from 'react-router-dom';

const DefaultRedirect = () => {
    const isAdmin = localStorage.getItem('is_admin') === 'true';
    console.log("🚀 ~ DefaultRedirect ~ isAdmin:", isAdmin)

    if (isAdmin) return <Navigate to="/admin" replace />;
    else return <Navigate to="/doctor" replace />;
}

export default DefaultRedirect