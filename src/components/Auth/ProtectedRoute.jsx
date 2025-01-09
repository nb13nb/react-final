import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../context/auth/AuthContextProvider';

function ProtectedRoute({ children }) {
  const { state } = useAuthContext();

  if (state.authIsLoading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading...</p>;
  }

  if (!state.isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default ProtectedRoute;
