import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { logout } from '../../Common/Apis/ApiService'
import { useLoader } from '../../Common/Loader/useLoader'
import { useSuccess } from '../../Common/Toasts/SuccessProvider'
import { useAlert } from '../../Common/Toasts/AlertProvider'
import { getImage, getRoute } from '../../Common/Handler'
import logo from '../../../public/img/logo/logo.png'
import { useSelector } from 'react-redux'
import menuImg from '../../../public/img/icons/bar-icon.svg'
import searchImg from '../../../public/img/icons/search-normal.svg'

const Header = () => {

  const { alert } = useAlert()
  const { success } = useSuccess()
  const { startLoading, stopLoading } = useLoader();
  const navigate = useNavigate()
  const profile = useSelector(state => state.handle.profile);

  const handleLogOut = async () => {
    try {
      startLoading()
      const response = await logout()
      stopLoading()

      if (response.status) {
        window.localStorage.clear();
        navigate('/sign-in')
        success(response.message)
      } else {
        alert(response.message)
      }

    } catch (error) {
      console.log(error)
      stopLoading()
      alert("Please Try Again!")
    }
  }


  return (
    <>

      <div className={`header`}>
        <div className="header-left">
          <Link to="/" className="logo">
            <div className="w-1/15 md:w-1/18 lg:w-1/22 xl:w-1/28 2xl:w-1/35">
              {/* <img className="w-full" src={logo} alt="Logo" /> */}
            </div>
            {/* <img src={logo} width={24} height={35} alt="" />{" "} */}
            <img src={logo} style={{ objectFit: 'cover', width: '28px' }} alt="" />{" "}
            <span>BloodBank</span>
          </Link>
        </div>
        <Link id="toggle_btn" to="#">
          <img src={menuImg} alt="" />
        </Link>
        <Link id="mobile_btn" className="mobile_btn float-start" to="#sidebar">
          <img src={menuImg} alt="" />
        </Link>
        <div className="top-nav-search mob-view">
          <form>
            <input type="text" className="form-control" placeholder="Search here" />
            <Link className="btn">
              <img src={searchImg} alt="" />
            </Link>
          </form>
        </div>
        <ul className="nav user-menu float-end">
          <li className="nav-item dropdown has-arrow user-profile-list">
            <Link
              to="#"
              className="dropdown-toggle nav-link user-link"
              data-bs-toggle="dropdown"
            >
              <div className="user-names">
                <h5>{`${profile?.first_name} ${profile?.last_name}`}</h5>
                <span>Admin</span>
              </div>
              <span className="user-img">
                <img style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', overflow: 'hidden' }} src={getImage(profile?.profile_pic)} alt="Admin" />
              </span>
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item" to={`${getRoute()}/profile`}>
                My Profile
              </Link>
              <Link className="dropdown-item" to={`${getRoute('login') == 'doctor' ? `${getRoute()}/profile/edit/${localStorage.getItem('id')}` : `${getRoute()}/profile/edit/${localStorage.getItem('id')}`}`}>
                Edit Profile
              </Link>
              <Link onClick={handleLogOut} className="dropdown-item" to="/sign-in">
                Logout
              </Link>
            </div>
          </li>
        </ul>
        <div className="dropdown mobile-user-menu float-end">
          <Link
            to="#"
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-ellipsis-vertical" />
          </Link>
          <div className="dropdown-menu dropdown-menu-end">
            <Link className="dropdown-item" to="/profile">
              My Profile
            </Link>
            <Link className="dropdown-item" to={`${getRoute('login') == 'doctor' ? `${getRoute()}/profile/edit/${localStorage.getItem('id')}` : `${getRoute()}/profile/edit/${localStorage.getItem('id')}`}`}>
              Edit Profile
            </Link>
            <Link onClick={handleLogOut} className="dropdown-item" to="/sign-in">
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header