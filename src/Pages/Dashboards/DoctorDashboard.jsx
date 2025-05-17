import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import { getAppointment, getContact, getHospital } from '../../Common/Apis/ApiService';
import { useLoader } from '../../Common/Loader/useLoader';
import { useSuccess } from '../../Common/Toasts/SuccessProvider';
import { useAlert } from '../../Common/Toasts/AlertProvider';

const DoctorDashboard = () => {

  const profile = useSelector(state => state.handle.profile);
  const doctors = useSelector(state => state.handle.doctorList);
  const [appointment, setAppointment] = useState(0)
  const [pendingAppointment, setPendingAppointment] = useState(0)
  const [query, setQuery] = useState(0)

  const { alert } = useAlert()
  const { success } = useSuccess()
  const { startLoading, stopLoading } = useLoader();

  const handleGetAppointmentData = async () => {
    try {
      startLoading()
      const response = await getAppointment('doctor')
      stopLoading()

      if (response.status) {
        setAppointment(response?.data?.length)
        setPendingAppointment(response?.data?.filter((el) => el.status?.toLowerCase() == 'pending').length)
      } else {
        alert(response.message)
      }
    } catch (error) {
      console.log(error)
      stopLoading()
      alert("Please Try Again!")
    }
  }

  const handleGetQueryData = async () => {
    try {
      startLoading()
      const response = await getContact('all')
      stopLoading()

      if (response.status) {
        setQuery(response?.data?.length)
      } else {
        alert(response.message)
      }

    } catch (error) {
      console.log(error)
      alert("Please Try Again!")
    }
  }

  useEffect(() => {
    const justLoggedIn = sessionStorage.getItem("justLoggedIn");

    if (justLoggedIn === "true") {
      sessionStorage.setItem("justLoggedIn", "false");
      window.location.reload();
    }
    handleGetAppointmentData()
    handleGetQueryData()
  }, []);


  return (
    <>

      <div className="page-wrapper">
        <div className="content">
          {/* Page Header */}
          <div className="page-header">
            <div className="row">
              <div className="col-sm-12">
                <ul className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Dashboard </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <i className="feather-chevron-right" />
                  </li>
                  <li className="breadcrumb-item active">Doctor Dashboard</li>
                </ul>
              </div>
            </div>
          </div>
          {/* /Page Header */}
          <div className="good-morning-blk">
            <div className="row">
              <div className="col-md-6">
                <div className="morning-user">
                  <h2>
                    Good Morning, <span>{`${profile?.first_name} ${profile?.last_name}`}</span>
                  </h2>
                  <p>Have a nice day at work</p>
                </div>
              </div>
              <div className="col-md-6 position-blk">
                <div className="morning-img">
                  <img src="/img/morning-img-02.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src="/img/icons/calendar.svg" alt="" />
                </div>
                <div className="dash-content dash-count">
                  <h4>Appointments</h4>
                  <h2>
                    <span className="counter-up">{appointment}</span>
                  </h2>
                  <p>
                    <span className="passive-view">
                      <i className="feather-arrow-up-right me-1" />
                      40%
                    </span>{" "}
                    vs last month
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src="/img/icons/profile-add.svg" alt="" />
                </div>
                <div className="dash-content dash-count">
                  <h4>Doctors</h4>
                  <h2>
                    <span className="counter-up">{doctors?.length}</span>
                  </h2>
                  <p>
                    <span className="passive-view">
                      <i className="feather-arrow-up-right me-1" />
                      20%
                    </span>{" "}
                    vs last month
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src="/img/icons/scissor.svg" alt="" />
                </div>
                <div className="dash-content dash-count">
                  <h4>Pending Appointment</h4>
                  <h2>
                    <span className="counter-up">{pendingAppointment}</span>
                  </h2>
                  <p>
                    <span className="negative-view">
                      <i className="feather-arrow-down-right me-1" />
                      15%
                    </span>{" "}
                    vs last month
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6 col-xl-3">
              <div className="dash-widget">
                <div className="dash-boxs comman-flex-center">
                  <img src="/img/icons/scissor.svg" alt="" />
                </div>
                <div className="dash-content dash-count">
                  <h4>Querye's</h4>
                  <h2>
                    <span className="counter-up">{query}</span>
                  </h2>
                  <p>
                    <span className="passive-view">
                      <i className="feather-arrow-up-right me-1" />
                      30%
                    </span>{" "}
                    vs last month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default DoctorDashboard