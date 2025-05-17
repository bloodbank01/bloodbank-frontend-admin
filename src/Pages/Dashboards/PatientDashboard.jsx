import React from 'react'

const PatientDashboard = () => {
    return (
        <div className="page-wrapper">
            <div className="content">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="index.html">Dashboard </a>
                                </li>
                                <li className="breadcrumb-item">
                                    <i className="feather-chevron-right" />
                                </li>
                                <li className="breadcrumb-item active">Patient Dashboard</li>
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
                                    Good Morning, <span>Williams Sarah</span>
                                </h2>
                                <p>Have a nice day at work</p>
                            </div>
                        </div>
                        <div className="col-md-6 position-blk">
                            <div className="morning-img">
                                <img src="/img/morning-img-03.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-12 col-lg-12 col-xl-7">
                        <div className="card">
                            <div className="card-body">
                                <div className="chart-title patient-visit mb-0">
                                    <h4>Static of your Health</h4>
                                    <div className="income-value">
                                        <p>
                                            <span className="passive-view">
                                                <i className="feather-arrow-up-right me-1" />
                                                40%
                                            </span>{" "}
                                            vs last month
                                        </p>
                                    </div>
                                    <div className="average-health">
                                        <h5>
                                            72bmp <span>Average</span>
                                        </h5>
                                    </div>
                                    <div className="input-block mb-0">
                                        <select className="form-control select">
                                            <option>2022</option>
                                            <option>2021</option>
                                            <option>2020</option>
                                            <option>2019</option>
                                        </select>
                                    </div>
                                </div>
                                <div id="health-chart" />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-lg-12 col-xl-5 d-flex">
                        <div className="card">
                            <div className="card-body">
                                <div className="chart-title patient-visit">
                                    <h4>Body Mass index</h4>
                                </div>
                                <div className="body-mass-blk">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="weight-blk">
                                                <div className="center slider">
                                                    <div>
                                                        <h4>68</h4>
                                                        <span>kg</span>
                                                    </div>
                                                    <div>
                                                        <h4>70</h4>
                                                        <span>kg</span>
                                                    </div>
                                                    <div>
                                                        <h4>72</h4>
                                                        <span>kg</span>
                                                    </div>
                                                    <div>
                                                        <h4>74</h4>
                                                        <span>kg</span>
                                                    </div>
                                                    <div>
                                                        <h4>76</h4>
                                                        <span>kg</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="weight-blk">
                                                <div className="center slider">
                                                    <div>
                                                        <h4>160</h4>
                                                        <span>cm</span>
                                                    </div>
                                                    <div>
                                                        <h4>162</h4>
                                                        <span>cm</span>
                                                    </div>
                                                    <div>
                                                        <h4>164</h4>
                                                        <span>cm</span>
                                                    </div>
                                                    <div>
                                                        <h4>166</h4>
                                                        <span>cm</span>
                                                    </div>
                                                    <div>
                                                        <h4>168</h4>
                                                        <span>cm</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress weight-bar">
                                        <div
                                            className="progress-bar progress-bar-success"
                                            role="progressbar"
                                        />
                                    </div>
                                    <ul className="weight-checkit">
                                        <li>Underweight</li>
                                        <li>Normal (45.5)</li>
                                        <li>Overweight</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 col-xl-3 d-flex">
                        <div className="card report-blk">
                            <div className="card-body">
                                <div className="report-head">
                                    <h4>
                                        <img
                                            src="/img/icons/report-icon-01.svg"
                                            className="me-2"
                                            alt=""
                                        />
                                        Heart Rate
                                    </h4>
                                </div>
                                <div id="heart-rate" />
                                <div className="dash-content">
                                    <h5>
                                        110 <span>bpm</span>
                                    </h5>
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
                    </div>
                    <div className="col-12 col-md-6 col-xl-3 d-flex">
                        <div className="card report-blk">
                            <div className="card-body">
                                <div className="report-head">
                                    <h4>
                                        <img
                                            src="/img/icons/report-icon-02.svg"
                                            className="me-2"
                                            alt=""
                                        />
                                        Temperature
                                    </h4>
                                </div>
                                <div id="temperature-chart" />
                                <div className="dash-content">
                                    <h5>
                                        38.6 <span>c</span>
                                    </h5>
                                    <p>
                                        <span className="negative-view">
                                            <i className="feather-arrow-down-right me-1" />
                                            -20%
                                        </span>{" "}
                                        vs last month
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3 d-flex">
                        <div className="card report-blk">
                            <div className="card-body">
                                <div className="report-head">
                                    <h4>
                                        <img
                                            src="/img/icons/report-icon-03.svg"
                                            className="me-2"
                                            alt=""
                                        />
                                        Blood Pressure
                                    </h4>
                                </div>
                                <div id="pressure-chart" />
                                <div className="dash-content">
                                    <h5>
                                        120 <span>mm/Hg</span>
                                    </h5>
                                    <p>
                                        <span className="negative-view">
                                            <i className="feather-arrow-down-right me-1" />
                                            -40%
                                        </span>{" "}
                                        vs last month
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 col-xl-3 d-flex">
                        <div className="card report-blk">
                            <div className="card-body">
                                <div className="report-head">
                                    <h4>
                                        <img
                                            src="/img/icons/report-icon-04.svg"
                                            className="me-2"
                                            alt=""
                                        />
                                        Sleep
                                    </h4>
                                </div>
                                <div id="sleep-chart" />
                                <div className="dash-content">
                                    <h5>
                                        7<span>h</span> 30 <span>m</span>
                                    </h5>
                                    <p>
                                        <span className="negative-view">
                                            <i className="feather-arrow-down-right me-1" />
                                            -10%
                                        </span>{" "}
                                        vs last month
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-12 col-xl-7">
                        <div className="row">
                            <div className="col-12 col-md-6 col-xl-5">
                                <div className="card top-departments">
                                    <div className="card-header pb-0">
                                        <h4 className="card-title mb-0">Notes</h4>
                                    </div>
                                    <div className="card-body pt-1">
                                        <div className="note-checkit">
                                            <label className="custom_check">
                                                <input
                                                    type="checkbox"
                                                    name="select_specialist"
                                                    defaultChecked=""
                                                />
                                                <span className="checkmark" /> Take vitamin Tablet
                                            </label>
                                        </div>
                                        <div className="note-checkit">
                                            <label className="custom_check">
                                                <input
                                                    type="checkbox"
                                                    name="select_specialist"
                                                    defaultChecked=""
                                                />
                                                <span className="checkmark" /> Add Appoinment
                                            </label>
                                        </div>
                                        <div className="note-checkit">
                                            <label className="custom_check">
                                                <input type="checkbox" name="select_specialist" />
                                                <span className="checkmark" /> Set a goal
                                            </label>
                                        </div>
                                        <div className="note-checkit">
                                            <label className="custom_check mb-0">
                                                <input type="checkbox" name="select_specialist" />
                                                <span className="checkmark" /> Add new weight
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-xl-7 d-flex">
                                <div className="card wallet-widget general-health">
                                    <div className="circle-bar circle-bar2">
                                        <div className="circle-graph2" data-percent={66}>
                                            <b>
                                                <img src="/img/icons/health-img.svg" alt="" />
                                            </b>
                                        </div>
                                    </div>
                                    <div className="main-limit">
                                        <p>General Health</p>
                                        <h4>75%</h4>
                                        <div className="income-value mt-2">
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
                            </div>
                            <div className="col-12 col-md-12  col-xl-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h4 className="card-title d-inline-block">Medical History</h4>{" "}
                                        <a href="appointments.html" className="patient-views float-end">
                                            Show all
                                        </a>
                                    </div>
                                    <div className="card-body p-0 table-dash">
                                        <div className="table-responsive">
                                            <table className="table mb-0 border-0 datatable custom-table patient-table">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <div className="form-check check-tables">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue="something"
                                                                />
                                                            </div>
                                                        </th>
                                                        <th>Doctor name</th>
                                                        <th>Diagnosis</th>
                                                        <th>Date</th>
                                                        <th />
                                                        <th />
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="form-check check-tables">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue="something"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="table-image">
                                                            <img
                                                                width={28}
                                                                height={28}
                                                                className="rounded-circle"
                                                                src="/img/profiles/avatar-02.jpg"
                                                                alt=""
                                                            />
                                                            <h2>Dr.Jenny Smith</h2>
                                                        </td>
                                                        <td>Dermotology</td>
                                                        <td>12.05.2022 </td>
                                                        <td>
                                                            <button className="custom-badge status-gray re-shedule">
                                                                Reschedule
                                                            </button>
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a
                                                                    href="#"
                                                                    className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="fa fa-ellipsis-v" />
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="edit-appointment.html"
                                                                    >
                                                                        <i className="fa-solid fa-pen-to-square m-r-5" />{" "}
                                                                        Edit
                                                                    </a>
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#delete_appointment"
                                                                    >
                                                                        <i className="fa fa-trash-o m-r-5" /> Delete
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-check check-tables">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue="something"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="table-image">
                                                            <img
                                                                width={28}
                                                                height={28}
                                                                className="rounded-circle"
                                                                src="/img/profiles/avatar-04.jpg"
                                                                alt=""
                                                            />
                                                            <h2>Andrea Lalema</h2>
                                                        </td>
                                                        <td>Dermotology</td>
                                                        <td>10.05.2022 </td>
                                                        <td>
                                                            <button className="custom-badge status-gray re-shedule">
                                                                Reschedule
                                                            </button>
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a
                                                                    href="#"
                                                                    className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="fa fa-ellipsis-v" />
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="edit-appointment.html"
                                                                    >
                                                                        <i className="fa-solid fa-pen-to-square m-r-5" />{" "}
                                                                        Edit
                                                                    </a>
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#delete_appointment"
                                                                    >
                                                                        <i className="fa fa-trash-o m-r-5" /> Delete
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div className="form-check check-tables">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    defaultValue="something"
                                                                />
                                                            </div>
                                                        </td>
                                                        <td className="table-image">
                                                            <img
                                                                width={28}
                                                                height={28}
                                                                className="rounded-circle"
                                                                src="/img/profiles/avatar-05.jpg"
                                                                alt=""
                                                            />
                                                            <h2>Dr.William Stephin</h2>
                                                        </td>
                                                        <td>Dermotology</td>
                                                        <td>12.05.2022 </td>
                                                        <td>
                                                            <button className="custom-badge status-gray re-shedule ">
                                                                Reschedule
                                                            </button>
                                                        </td>
                                                        <td className="text-end">
                                                            <div className="dropdown dropdown-action">
                                                                <a
                                                                    href="#"
                                                                    className="action-icon dropdown-toggle"
                                                                    data-bs-toggle="dropdown"
                                                                    aria-expanded="false"
                                                                >
                                                                    <i className="fa fa-ellipsis-v" />
                                                                </a>
                                                                <div className="dropdown-menu dropdown-menu-end">
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="edit-appointment.html"
                                                                    >
                                                                        <i className="fa-solid fa-pen-to-square m-r-5" />{" "}
                                                                        Edit
                                                                    </a>
                                                                    <a
                                                                        className="dropdown-item"
                                                                        href="#"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#delete_appointment"
                                                                    >
                                                                        <i className="fa fa-trash-o m-r-5" /> Delete
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-xl-5">
                        <div className="card flex-fill mb-2">
                            <div className="card-body">
                                <div id="calendar-doctor" className="calendar-container" />
                            </div>
                        </div>
                        <div className="treat-box mb-2">
                            <div className="user-imgs-blk">
                                <img src="/img/profiles/avatar-05.jpg" alt="" />
                                <div className="active-user-detail flex-grow-1">
                                    <h4>General Health Check up</h4>
                                    <p>Dr. Dianne Philips at 10:00-11:00 AM</p>
                                </div>
                            </div>
                            <a href="javascript:;" className="custom-badge status-green">
                                Active
                            </a>
                        </div>
                        <div className="treat-box mb-2">
                            <div className="user-imgs-blk">
                                <img src="/img/profiles/avatar-03.jpg" alt="" />
                                <div className="active-user-detail flex-grow-1">
                                    <h4>Temporary Headache </h4>
                                    <p>Dr. Jenny Smith at 05:00-06:00 PM</p>
                                </div>
                            </div>
                            <a href="javascript:;" className="custom-badge status-orange">
                                Pending
                            </a>
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

    )
}

export default PatientDashboard