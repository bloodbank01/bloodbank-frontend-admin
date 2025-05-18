import './App.css';
import { Route, Routes, useLocation, useNavigate } from "react-router";
import SecureRoutes from './SecureRoutes/SecureRoutes';
import { Navigate } from 'react-router-dom';
import AdminDashboard from './Pages/Dashboards/AdminDashboard';
import Header from './Component/Header/Header';
import DoctorDashboard from './Pages/Dashboards/DoctorDashboard';
import DoctorList from './Pages/Doctor/DoctorList';
import AddDoctor from './Pages/Doctor/AddDoctor';
import EditDoctor from './Pages/Doctor/EditDoctor';
import DoctorProfile from './Pages/Doctor/DoctorProfile';
import AppointmentList from './Pages/Appointment/AppointmentList';
import SignIn from './Pages/Auth/SignIn';
import ResetPassword from './Pages/Password/ResetPassword';
import ForgotPassword from './Pages/Password/ForgotPassword';
import EditProfile from './Pages/Profile/EditProfile';
import Profile from './Pages/Profile/Profile';
import Sidebar from './Component/Sidebar/Sidebar';
import SecureRoutesAdmin from './SecureRoutes/SecureRoutesDoctor';
import DefaultRedirect from './SecureRoutes/DefaultRedirect';
import HospitalList from './Pages/Hospital/HospitalList';
import AddHospital from './Pages/Hospital/AddHospital';
import EditHospital from './Pages/Hospital/EditHospital';
import { useEffect } from 'react';
import { getBloodGroup, getDoctor, getHospital, getProfile } from './Common/Apis/ApiService';
import { useDispatch } from 'react-redux';
import { hospitalList, doctorList, bloodGroupList, userProfile } from './Redux/Action';
import { useLoader } from './Common/Loader/useLoader';
import { useAlert } from './Common/Toasts/AlertProvider';
import EditDoctorProfile from './Pages/Doctor/EditDoctorProfile';
import SubDoctorProfile from './Pages/Doctor/SubDoctorProfile';
import BloodGroupList from './Pages/BloodGroup/BloodGroupList';
import AddBloodGroup from './Pages/BloodGroup/AddBloodGroup';
import EditBloodGroup from './Pages/BloodGroup/EditBloodGroup';
import ContactList from './Pages/Contact/ContactList';

function App() {
  const location = useLocation();
  let dispatch = useDispatch()
  const { alert } = useAlert()
  // const { success } = useSuccess()
  const { startLoading, stopLoading } = useLoader();

  const hideHeaderSidebarRoutes = ['/sign-in', '/reset-password', '/forgot-password'];
  const shouldHideHeaderSidebar = hideHeaderSidebarRoutes.includes(location.pathname);

  if (localStorage.getItem('token')) {
    useEffect(() => {
      // setTimeout(() => {
        (async () => {
          try {
            startLoading()
            const response = await getHospital()
            stopLoading()

            if (response.status) {
              dispatch(hospitalList(response.data))
            } else {
              alert(response.message)
            }

            startLoading()
            const response_doctor = await getDoctor()
            stopLoading()

            if (response_doctor.status) {
              dispatch(doctorList(response_doctor.data))
            } else {
              alert(response_doctor.message)
            }

            startLoading()
            const blood_group_list = await getBloodGroup()
            stopLoading()

            if (blood_group_list.status) {
              dispatch(bloodGroupList(blood_group_list.data))
            } else {
              alert(blood_group_list.message)
            }

            startLoading()
            const response_profile = await getProfile()
            stopLoading()

            if (response_profile.status) {
              dispatch(userProfile(response_profile.data))
            } else {
              alert(response_profile.message)
            }

          } catch (error) {
            console.log(error)
            stopLoading()
            alert("Please Try Again!")
          }

        })()
      // }, 2000);

    }, [])
  }

  return (
    <div className="main-wrapper">
      {!shouldHideHeaderSidebar && <Header />}
      {!shouldHideHeaderSidebar && <Sidebar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes */}

        <Route path="admin" element={<SecureRoutes />}>
          {/* Admin Routes */}
          <Route index element={<AdminDashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit/:id" element={<EditProfile />} />
          <Route path="doctor/profile/:id" element={<SubDoctorProfile />} />
          <Route path="dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="blood-group/list" element={<BloodGroupList />} />
          <Route path="blood-group/add" element={<AddBloodGroup />} />
          <Route path="blood-group/edit/:id" element={<EditBloodGroup />} />
          <Route path="hospital/list" element={<HospitalList />} />
          <Route path="hospital/add" element={<AddHospital />} />
          <Route path="hospital/edit/:id" element={<EditHospital />} />
          <Route path="contact/list" element={<ContactList />} />
          <Route path="doctor/list" element={<DoctorList />} />
          <Route path="doctor/add" element={<AddDoctor />} />
          <Route path="doctor/edit/:id" element={<EditDoctor />} />
          <Route path="doctor/profile" element={<DoctorProfile />} />
          <Route path="appointment/list" element={<AppointmentList />} />
        </Route>

        <Route path="doctor" element={<SecureRoutesAdmin />}>

          <Route index element={<DoctorDashboard />} />
          <Route path="list" element={<DoctorList />} />
          <Route path="add" element={<AddDoctor />} />
          <Route path="edit/:id" element={<EditDoctor />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="profile/:id" element={<SubDoctorProfile />} />
          <Route path="profile/edit/:id" element={<EditDoctorProfile />} />
          <Route path="contact/list" element={<ContactList />} />
          <Route path="appointment/list" element={<AppointmentList />} />
        </Route>

        <Route path="/" element={<DefaultRedirect />}> </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
