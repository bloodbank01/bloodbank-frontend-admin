import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useAlert } from '../../Common/Toasts/AlertProvider'
import { useSuccess } from '../../Common/Toasts/SuccessProvider'
import { useLoader } from '../../Common/Loader/useLoader'
import { getProfile } from '../../Common/Apis/ApiService'
import { useDispatch, useSelector } from 'react-redux'
import { userProfile } from '../../Redux/Action';
import { getRoute } from '../../Common/Handler'

const Profile = () => {

    let dispatch = useDispatch()
    const navigate = useNavigate()
    const profile = useSelector(state => state.handle.profile);

    console.log(profile, 'profile')
    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();

    useEffect(() => {
        (async () => {
            try {
                startLoading()
                const response = await getProfile()
                stopLoading()
                if (response.status) {
                    dispatch(userProfile(response.data))
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
        <div className="page-wrapper">
            <div className="content">
                <div className="row">
                    <div className="col-sm-7 col-6">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <i className="feather-chevron-right" />
                            </li>
                            <li className="breadcrumb-item active">My Profile</li>
                        </ul>
                    </div>
                    <div className="col-sm-5 col-6 text-end m-b-30">
                        <Link to={`${getRoute('login') == 'doctor' ? `${getRoute()}/profile/edit/${localStorage.getItem('id')}` : `${getRoute()}/profile/edit/${localStorage.getItem('id')}`}`} className="btn btn-primary btn-rounded">
                            <i className="fa fa-plus" /> Edit Profile
                        </Link>
                    </div>
                </div>
                <div className="card-box profile-header">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="profile-view">
                                <div className="profile-img-wrap">
                                    <div className="profile-img">
                                        <Link to="#">
                                            <img
                                                style={{ objectFit: 'cover' }}
                                                className="avatar object-cover"
                                                src={profile?.profile_pic}
                                                alt=""
                                            />
                                        </Link>
                                    </div>
                                </div>
                                <div className="profile-basic">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="profile-info-left">
                                                <h3 className="user-name m-t-0 mb-0">{`${profile?.first_name} ${profile?.last_name}`}</h3>
                                                <small className="text-muted">Admin</small>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <ul className="personal-info">
                                                <li>
                                                    <span className="title">Phone:</span>
                                                    <span className="text">
                                                        <Link to="#">{profile?.address?.phone_no}</Link>
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="title">Email:</span>
                                                    <span className="text">
                                                        <Link to="#">
                                                            <span
                                                                className="__cf_email__"
                                                                data-cfemail="95f6e7fce6e1fcfbf4f2e7fae3f0e6d5f0edf4f8e5f9f0bbf6faf8"
                                                            >
                                                                {profile?.user?.email}
                                                            </span>
                                                        </Link>
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="title">Birthday:</span>
                                                    <span className="text">{profile?.dob}</span>
                                                </li>
                                                <li>
                                                    <span className="title">Address:</span>
                                                    <span className="text">
                                                        {`${profile?.address?.address}, ${profile?.address?.state}, ${profile?.address?.pincode}`}
                                                    </span>
                                                </li>
                                                <li>
                                                    <span className="title">Gender:</span>
                                                    <span className="text">{profile?.gender}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="profile-tabs">
                    <ul className="nav nav-tabs nav-tabs-bottom">
                        <li className="nav-item">
                            <Link
                                className="nav-link active"
                                href="#about-cont"
                                data-bs-toggle="tab"
                            >
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="#bottom-tab2" data-bs-toggle="tab">
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" href="#bottom-tab3" data-bs-toggle="tab">
                                Messages
                            </Link>
                        </li>
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane show active" id="about-cont">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card-box">
                                        <h3 className="card-title">Education Informations</h3>
                                        <div className="experience-box">
                                            <ul className="experience-list">
                                                <li>
                                                    <div className="experience-user">
                                                        <div className="before-circle" />
                                                    </div>
                                                    <div className="experience-content">
                                                        <div className="timeline-content">
                                                            <Link to="#/" className="name">
                                                                International College of Medical Science (UG)
                                                            </Link>
                                                            <div>MBBS</div>
                                                            <span className="time">2001 - 2003</span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="experience-user">
                                                        <div className="before-circle" />
                                                    </div>
                                                    <div className="experience-content">
                                                        <div className="timeline-content">
                                                            <Link to="#/" className="name">
                                                                International College of Medical Science (PG)
                                                            </Link>
                                                            <div>MD - Obstetrics &amp; Gynaecology</div>
                                                            <span className="time">1997 - 2001</span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card-box ">
                                        <h3 className="card-title">Experience</h3>
                                        <div className="experience-box">
                                            <ul className="experience-list">
                                                <li>
                                                    <div className="experience-user">
                                                        <div className="before-circle" />
                                                    </div>
                                                    <div className="experience-content">
                                                        <div className="timeline-content">
                                                            <Link to="#/" className="name">
                                                                Consultant Gynecologist
                                                            </Link>
                                                            <span className="time">
                                                                Jan 2014 - Present (4 years 8 months)
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="experience-user">
                                                        <div className="before-circle" />
                                                    </div>
                                                    <div className="experience-content">
                                                        <div className="timeline-content">
                                                            <Link to="#/" className="name">
                                                                Consultant Gynecologist
                                                            </Link>
                                                            <span className="time">
                                                                Jan 2009 - Present (6 years 1 month)
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="experience-user">
                                                        <div className="before-circle" />
                                                    </div>
                                                    <div className="experience-content">
                                                        <div className="timeline-content">
                                                            <Link to="#/" className="name">
                                                                Consultant Gynecologist
                                                            </Link>
                                                            <span className="time">
                                                                Jan 2004 - Present (5 years 2 months)
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane" id="bottom-tab2">
                            Tab content 2
                        </div>
                        <div className="tab-pane" id="bottom-tab3">
                            Tab content 3
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Profile