// import React, { useEffect, useState } from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useLoader } from '../Common/Loader/useLoader';

// const SecureRoutes = () => {

//   const [auth, setAuth] = useState(null); // null means "still checking"
//   const { startLoading, stopLoading } = useLoader();

//   useEffect(() => {
//     const checkAuth = async () => {
//       startLoading(); // Start global loader
//       try {
//         const token = localStorage.getItem('token');
//         setAuth(!!token); // true if token exists
//       } catch (error) {
//         console.error("Error fetching token:", error);
//         setAuth(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   useEffect(() => {
//     if (auth !== null) {
//       stopLoading(); // Stop loader once auth is determined
//     }
//   }, [auth]);

//   if (auth === null) return null; // Don't render anything, just show global loader

//   if (!auth) return <Navigate to="/sign-in" />;

//   return (
//     <>
//       <Outlet />
//     </>
//   );
// };

// export default SecureRoutes;
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useLoader } from '../Common/Loader/useLoader';

const SecureRoutes = () => {
  const [auth, setAuth] = useState(null);
  const { startLoading, stopLoading } = useLoader();

  useEffect(() => {
    const checkAuth = async () => {
      startLoading(); // Start global loader
      try {
        const token = localStorage.getItem('token');
        const isAdminLocal = localStorage.getItem('is_admin') === 'true';

        if (token) {
            setAuth(isAdminLocal);
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

export default SecureRoutes;
