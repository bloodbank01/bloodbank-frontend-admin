import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { useSuccess } from '../../Common/Toasts/SuccessProvider';
import { useLoader } from '../../Common/Loader/useLoader';
import { logout } from '../../Common/Apis/ApiService';
import { useAlert } from '../../Common/Toasts/AlertProvider';
import { getRoute } from '../../Common/Handler';
// import '../../../public/js/jquery-3.7.1.min.js'
// import '../../../public/js/app'

const Sidebar = () => {

    const [activeMenu, setActiveMenu] = useState('dashboard');
    const [activeSubmenu, setActiveSubmenu] = useState('');
    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();
    const navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            startLoading()
            const response = await logout()
            stopLoading()

            if (response.status) {
                localStorage.clear();
                success(response.message)
                navigate('/sign-in')
            } else {
                alert(response.message)
            }

        } catch (error) {
            console.log(error)
            stopLoading()
            alert("Please Try Again!")
        }
    }

    const handleMenuClick = (menuItem) => {
        setActiveMenu(menuItem);
        setActiveSubmenu('');
        if (menuItem == 'dashboard') {
            setActiveMenu(menuItem);
            navigate('/')
        }
    };

    const handleSubmenuClick = (subMenuItem) => {
        setActiveSubmenu(subMenuItem);
    };

    return (
        <>
            <div className={`sidebar`} id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">

                        <ul>
                            <li className="menu-title">Main</li>
                            <li className="submenu">
                                <Link
                                    to="/"
                                    onClick={() => handleMenuClick('dashboard')}
                                    className={activeMenu === 'dashboard' ? 'active' : ''}
                                >
                                    <span className="menu-side">
                                        <img src="/img/icons/menu-icon-01.svg" alt="" />
                                    </span>
                                    <span> Dashboard </span>
                                </Link>
                                {/* <ul style={{ display: "none" }}>
                        <li>
                            <Link
                                to="/"
                                onClick={() => handleSubmenuClick('admin')}
                                className={activeSubmenu === 'admin' ? 'active' : ''}
                            >
                                Admin Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/doctor"
                                onClick={() => handleSubmenuClick('doctor')}
                                className={activeSubmenu === 'doctor' ? 'active' : ''}
                            >
                                Doctor Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/patient"
                                onClick={() => handleSubmenuClick('patient')}
                                className={activeSubmenu === 'patient' ? 'active' : ''}
                            >
                                Patient Dashboard
                            </Link>
                        </li>
                    </ul> */}
                            </li>
                            {getRoute('login') == 'admin' && <li className="submenu">
                                <Link to="#" onClick={() => handleMenuClick('hospitals')} className={activeMenu === 'hospitals' ? 'active' : ''}>
                                    <span className="menu-side">
                                        <img src="/img/icons/menu-icon-03.svg" alt="" />
                                    </span>
                                    <span>Hospitals </span> <span className="menu-arrow" />
                                </Link>
                                <ul style={{ display: "none" }}>
                                    <li>
                                        <Link to={`${getRoute()}/hospital/list`} onClick={() => handleSubmenuClick('hospitalsList')} className={activeSubmenu === 'hospitalsList' ? 'active' : ''}>
                                            Hospitals List
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`${getRoute()}/hospital/add`} onClick={() => handleSubmenuClick('addHospitals')} className={activeSubmenu === 'addHospitals' ? 'active' : ''}>
                                            Add Hospitals
                                        </Link>
                                    </li>
                                    {/* <li>
                            <Link to="/admin/hospital/edit" onClick={() => handleSubmenuClick('editHospitals')} className={activeSubmenu === 'editHospitals' ? 'active' : ''}>
                                Edit Hospitals
                            </Link>
                        </li> */}
                                </ul>
                            </li>}
                            <li className="submenu">
                                <Link to="#" onClick={() => handleMenuClick('contacts')} className={activeMenu === 'contacts' ? 'active' : ''}>
                                    <span className="menu-side">
                                        <img src="/img/icons/menu-icon-03.svg" alt="" />
                                    </span>
                                    <span>Contacts </span> <span className="menu-arrow" />
                                </Link>
                                <ul style={{ display: "none" }}>
                                    <li>
                                        <Link to={`${getRoute()}/contact/list`} onClick={() => handleSubmenuClick('contactsList')} className={activeSubmenu === 'contactsList' ? 'active' : ''}>
                                            Contacts List
                                        </Link>
                                    </li>
                                    {/* <li>
                            <Link to="/admin/contact/edit" onClick={() => handleSubmenuClick('editContacts')} className={activeSubmenu === 'editContacts' ? 'active' : ''}>
                                Edit Contacts
                            </Link>
                        </li> */}
                                </ul>
                            </li>
                            {getRoute('login') == 'admin' && <li className="submenu">
                                <Link to="#" onClick={() => handleMenuClick('bloodgroups')} className={activeMenu === 'bloodgroups' ? 'active' : ''}>
                                    <span className="menu-side">
                                        <img src="/img/icons/menu-icon-03.svg" alt="" />
                                    </span>
                                    <span>Blood Group </span> <span className="menu-arrow" />
                                </Link>
                                <ul style={{ display: "none" }}>
                                    <li>
                                        <Link to={`${getRoute()}/blood-group/list`} onClick={() => handleSubmenuClick('bloodgroupsList')} className={activeSubmenu === 'bloodgroupsList' ? 'active' : ''}>
                                            Blood Group List
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`${getRoute()}/blood-group/add`} onClick={() => handleSubmenuClick('addBloodGroup')} className={activeSubmenu === 'addBloodGroup' ? 'active' : ''}>
                                            Add Blood Group
                                        </Link>
                                    </li>
                                    {/* <li>
                            <Link to="/admin/blood-group/edit" onClick={() => handleSubmenuClick('editBlood Group')} className={activeSubmenu === 'editBlood Group' ? 'active' : ''}>
                                Edit Blood Group
                            </Link>
                        </li> */}
                                </ul>
                            </li>}
                            <li className="submenu">
                                <Link
                                    to="#"
                                    onClick={() => handleMenuClick('doctors')}
                                    className={activeMenu === 'doctors' ? 'active' : ''}
                                >
                                    <span className="menu-side">
                                        <img src="/img/icons/menu-icon-02.svg" alt="" />
                                    </span>
                                    <span> Doctors </span> <span className="menu-arrow" />
                                </Link>
                                <ul style={{ display: "none" }}>
                                    <li>
                                        <Link
                                            to={`${getRoute('login') == 'doctor' ? `${getRoute()}/list` : `${getRoute()}/doctor/list`}`}
                                            onClick={() => handleSubmenuClick('doctorList')}
                                            className={activeSubmenu === 'doctorList' ? 'active' : ''}
                                        >
                                            Doctor List
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`${getRoute('login') == 'doctor' ? `${getRoute()}/add` : `${getRoute()}/doctor/add`}`}
                                            onClick={() => handleSubmenuClick('addDoctor')}
                                            className={activeSubmenu === 'addDoctor' ? 'active' : ''}
                                        >
                                            Add Doctor
                                        </Link>
                                    </li>
                                    {/* <li>
                            <Link
                                to={`${getRoute('login') == 'doctor' ? `${getRoute()}/edit` : `${getRoute()}/doctor/edit`}`}
                                onClick={() => handleSubmenuClick('editDoctor')}
                                className={activeSubmenu === 'editDoctor' ? 'active' : ''}
                            >Edit Doctor</Link>
                        </li>
                        <li>
                            <Link
                                to={`${getRoute('login') == 'doctor' ? `${getRoute()}/profile` : `${getRoute()}/doctor/profile`}`}
                                onClick={() => handleSubmenuClick('doctorProfile')}
                                className={activeSubmenu === 'doctorProfile' ? 'active' : ''}
                            >
                                Doctor Profile for doctor
                            </Link>
                        </li> */}
                                </ul>
                            </li>
                            {/* <li className="submenu">
                    <Link to="#" onClick={() => handleMenuClick('patients')} className={activeMenu === 'patients' ? 'active' : ''}>
                        <span className="menu-side">
                            <img src="/img/icons/menu-icon-03.svg" alt="" />
                        </span>
                        <span>Patients </span> <span className="menu-arrow" />
                    </Link>
                    <ul style={{ display: "none" }}>
                        <li>
                            <Link to="/patient/list" onClick={() => handleSubmenuClick('patientsList')} className={activeSubmenu === 'patientsList' ? 'active' : ''}>
                                Patients List
                            </Link>
                        </li>
                        <li>
                            <Link to="/patient/add" onClick={() => handleSubmenuClick('addPatients')} className={activeSubmenu === 'addPatients' ? 'active' : ''}>
                                Add Patients
                            </Link>
                        </li>
                        <li>
                            <Link to="/patient/edit" onClick={() => handleSubmenuClick('editPatients')} className={activeSubmenu === 'editPatients' ? 'active' : ''}>
                                Edit Patients
                            </Link>
                        </li>
                        <li>
                            <Link to="/patient/profile" onClick={() => handleSubmenuClick('patientsProfile')} className={activeSubmenu === 'patientsProfile' ? 'active' : ''}>
                                Patients Profile
                            </Link>
                        </li>
                    </ul>
                </li> */}
                            {getRoute('login') == 'doctor' && <li className="submenu">
                                <Link to="#" onClick={() => handleMenuClick('appointments')} className={activeMenu === 'appointments' ? 'active' : ''}>
                                    <span className="menu-side">
                                        <img src="/img/icons/menu-icon-04.svg" alt="" />
                                    </span>
                                    <span> Appointments </span> <span className="menu-arrow" />
                                </Link>
                                <ul style={{ display: "none" }}>
                                    <li>
                                        <Link to={`${getRoute()}/appointment/list`} onClick={() => handleSubmenuClick('appointmentsList')} className={activeSubmenu === 'appointmentsList' ? 'active' : ''}>Appointment List</Link>
                                    </li>
                                </ul>
                            </li>}
                        </ul>
                        <div className="logout-btn">
                            <Link onClick={handleLogOut} style={{ cursor: 'pointer' }}>
                                <span className="menu-side">
                                    <img src="/img/icons/logout.svg" alt="" />
                                </span>{" "}
                                <span>Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar