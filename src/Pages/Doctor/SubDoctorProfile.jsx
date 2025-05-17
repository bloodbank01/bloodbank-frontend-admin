import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { calculateAge, convertMobileFormat, getImage, getRoute } from '../../Common/Handler'
import { getProfile, getProfileById } from '../../Common/Apis/ApiService'
import { useDispatch } from 'react-redux'
import { useAlert } from '../../Common/Toasts/AlertProvider'
import { useSuccess } from '../../Common/Toasts/SuccessProvider'
import { useLoader } from '../../Common/Loader/useLoader'

const SubDoctorProfile = () => {

    const params = useParams();
    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();
    const [profile, setProfile] = useState(null)
    const [profilePic, setProfilePic] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const { id } = params
                startLoading()
                const response = await getProfileById(id)
                stopLoading()
                if (response.status) {
                    setProfile(response.data)
                    setProfilePic(response.data.profile_pic)
                } else {
                    alert(response.message)
                }

            } catch (error) {
                console.log(error)
                stopLoading()
                alert("Please Try Again!")
            }
        })()
    }, [])



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
                                        <a href="doctors.html">Doctors </a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Doctors Profile</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="about-info">
                                                <h4>
                                                    Doctor Profile{" "}
                                                    <span className='position-relative'>
                                                        <a href="javascript:;">
                                                            <i className="feather-more-vertical" />
                                                        </a>
                                                        <div className="dropdown-menu dropdown-menu-end" style={{ right: '0' }}>
                                                            <Link className="dropdown-item" to={`${getRoute('login') == 'doctor' ? `${getRoute()}/profile/edit/${localStorage.getItem('id')}` : `${getRoute()}/doctor/profile/edit/${localStorage.getItem('id')}`}`}>
                                                                Edit Profile
                                                            </Link>
                                                        </div>
                                                    </span>
                                                </h4>
                                            </div>
                                            <div className="doctor-profile-head">
                                                <div className="row">
                                                    <div className="col-lg-4 col-md-4">
                                                        <div className="profile-user-box">
                                                            <div className="profile-user-img top-0 py-3" style={{ width: '160px', height: '190px' }}>
                                                                <img
                                                                    src={getImage(profilePic)}
                                                                    alt="Profile"
                                                                    className='w-100 h-100 object-cover rounded-circle'
                                                                    style={{ objectFit: 'cover' }}
                                                                />
                                                            </div>
                                                            <div className="names-profiles">
                                                                <h4>{`${profile?.first_name} ${profile?.last_name}`}</h4>
                                                                <h5>{profile?.designation}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="doctor-personals-grp">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="about-me-list">
                                                    <ul className="list-space">
                                                        <li>
                                                            <h4>Gender</h4>
                                                            <span>{profile?.gender}</span>
                                                        </li>
                                                        <li>
                                                            <h4>Age</h4>
                                                            <span>{calculateAge(profile?.dob)}</span>
                                                        </li>
                                                        <li>
                                                            <h4>Designation</h4>
                                                            <span>{profile?.designation}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="doctor-personals-grp">
                                    </div>
                                    <div className="doctor-personals-grp">

                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="doctor-personals-grp">
                                        <div className="card">
                                            <div className="card-body py-4">
                                                <div className="personal-list-out">
                                                    <div className="row">
                                                        <div className="col-xl-3 col-md-6">
                                                            <div className="detail-personal">
                                                                <h2>Full Name</h2>
                                                                <h3>{`${profile?.first_name} ${profile?.last_name}`}</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-6">
                                                            <div className="detail-personal">
                                                                <h2>Mobile </h2>
                                                                <h3>{convertMobileFormat(profile?.address?.phone_no)}</h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-6">
                                                            <div className="detail-personal">
                                                                <h2>Email</h2>
                                                                <h3>
                                                                    <a
                                                                        href="#"
                                                                        className="__cf_email__"
                                                                        data-cfemail="adcfdfd8cec8edc8c0ccc4c183cec2c0"
                                                                    >
                                                                        {profile?.user?.email}
                                                                    </a>
                                                                </h3>
                                                            </div>
                                                        </div>
                                                        <div className="col-xl-3 col-md-6">
                                                            <div className="detail-personal">
                                                                <h2>Location</h2>
                                                                <h3>{`${profile?.address?.country} ${profile?.address?.city}`}</h3>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="hello-park">
                                                    <p>
                                                        {profile?.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="notification-box">
                    <div className="msg-sidebar notifications msg-noti">
                        <div className="topnav-dropdown-header">
                            <span>Messages</span>
                        </div>
                        <div className="drop-scroll msg-list-scroll" id="msg_list">
                            <ul className="list-box">
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item">
                                            <div className="list-left">
                                                <span className="avatar">R</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author">Richard Miles </span>
                                                <span className="message-time">12:28 AM</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item new-message">
                                            <div className="list-left">
                                                <span className="avatar">J</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author">John Doe</span>
                                                <span className="message-time">1 Aug</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item">
                                            <div className="list-left">
                                                <span className="avatar">T</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author"> Tarah Shropshire </span>
                                                <span className="message-time">12:28 AM</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item">
                                            <div className="list-left">
                                                <span className="avatar">M</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author">Mike Litorus</span>
                                                <span className="message-time">12:28 AM</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item">
                                            <div className="list-left">
                                                <span className="avatar">C</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author"> Catherine Manseau </span>
                                                <span className="message-time">12:28 AM</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item">
                                            <div className="list-left">
                                                <span className="avatar">D</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author"> Domenic Houston </span>
                                                <span className="message-time">12:28 AM</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item">
                                            <div className="list-left">
                                                <span className="avatar">B</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author"> Buster Wigton </span>
                                                <span className="message-time">12:28 AM</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item">
                                            <div className="list-left">
                                                <span className="avatar">R</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author"> Rolland Webber </span>
                                                <span className="message-time">12:28 AM</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item">
                                            <div className="list-left">
                                                <span className="avatar">C</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author"> Claire Mapes </span>
                                                <span className="message-time">12:28 AM</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item">
                                            <div className="list-left">
                                                <span className="avatar">M</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author">Melita Faucher</span>
                                                <span className="message-time">12:28 AM</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item">
                                            <div className="list-left">
                                                <span className="avatar">J</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author">Jeffery Lalor</span>
                                                <span className="message-time">12:28 AM</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item">
                                            <div className="list-left">
                                                <span className="avatar">L</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author">Loren Gatlin</span>
                                                <span className="message-time">12:28 AM</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="chat.html">
                                        <div className="list-item">
                                            <div className="list-left">
                                                <span className="avatar">T</span>
                                            </div>
                                            <div className="list-body">
                                                <span className="message-author">Tarah Shropshire</span>
                                                <span className="message-time">12:28 AM</span>
                                                <div className="clearfix" />
                                                <span className="message-content">
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="topnav-dropdown-footer">
                            <a href="chat.html">See all messages</a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="delete_patient" className="modal fade delete-modal" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body text-center">
                            <img src="/img/sent.png" alt="" width={50} height={46} />
                            <h3>Are you sure want to delete this ?</h3>
                            <div className="m-t-20">
                                {" "}
                                <a href="#" className="btn btn-white" data-bs-dismiss="modal">
                                    Close
                                </a>
                                <button type="submit" className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default SubDoctorProfile