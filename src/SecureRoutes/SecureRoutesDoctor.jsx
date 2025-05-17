import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLoader } from '../Common/Loader/useLoader';

const SecureRoutesDoctor = () => {
  const [auth, setAuth] = useState(null);
  const { startLoading, stopLoading } = useLoader();

  useEffect(() => {
    const checkAuth = async () => {
      startLoading(); // Start global loader
      try {
        const token = localStorage.getItem('token');
        const isDoctorLocal = localStorage.getItem('is_doctor') === 'true';

        if (token) {
            setAuth(isDoctorLocal);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.error("Error checking admin status:", error);
        setAuth(false);
      } finally {
        stopLoading(); // Stop loader whether success or error
      }
    };

    checkAuth();
  }, []);

  if (auth === null) return null; // Waiting...

  if (!auth) return <Navigate to="/sign-in" />;

  return <Outlet />;
};

export default SecureRoutesDoctor;
