// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// eslint-disable-next-line react/prop-types
export default function Auth({ children }) {
  const authLogin = useSelector((state) => state.authLogin);
  if (!authLogin.data?.token.accessToken) {
    return <Navigate to='/login' replace={true} />;
  }
  return children;
}
