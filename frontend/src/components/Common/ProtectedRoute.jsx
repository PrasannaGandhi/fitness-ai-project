// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const ProtectedRoute = ({ children }) => {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;








import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // DEMO MODE: Set this to true to bypass login and see the dashboard
  const isAuthenticated = true; 

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;