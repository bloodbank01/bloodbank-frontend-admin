import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { useAlert } from '../../Common/Toasts/AlertProvider';
import { useSuccess } from '../../Common/Toasts/SuccessProvider';
import { useLoader } from '../../Common/Loader/useLoader';
import { deleteAppointment, getAppointment, getHospitalDoctors, updateAppointment, updateHospital } from '../../Common/Apis/ApiService';
import moment from 'moment'
import { getImage, getRoute } from '../../Common/Handler'
import DataTable from 'react-data-table-component';
import { FaAngleDown, FaRegTrashAlt } from 'react-icons/fa'
import { exportData } from '../../Common/Handler'
import { FaEllipsisVertical } from 'react-icons/fa6';
import DatePicker from 'react-datepicker';
import { FaEdit } from 'react-icons/fa';
import 'react-datepicker/dist/react-datepicker.css';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const AppointmentList = () => {

    const navigate = useNavigate()

    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [filteredData, setFilteredData] = useState(data)
    const [id, setId] = useState(null)
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [visibleRowId, setVisibleRowId] = useState(null);
    const [visibleTimeRowId, setVisibleTimeRowId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState('14:00'); // default time in 24-hour format
    const [doctors, setDoctors] = useState([]); // default time in 24-hour format


    const handleUpdateAppointment = async (data, id) => {
        try {
            startLoading()
            const response = await updateAppointment({ ...data, id })
            stopLoading()
            if (response.status) {
                setFilteredData(filteredData.map(item => item.id === response.data.id ? { ...response.data } : item))
            } else {
                alert(response.message)
            }

        } catch (error) {
            console.log(error)
            stopLoading()
            alert("Please Try Again!")
        }
    };

    const handleTimeChange = async (e, id) => {
        setSelectedTime(e.target.value);
        console.log(selectedTime)

        try {
            startLoading()
            const response = await updateAppointment({ appointment_time: e.target.value, id: visibleTimeRowId })
            stopLoading()
            if (response.status) {
                setVisibleTimeRowId(null)
                setFilteredData(filteredData.map(item => item.id === response.data.id ? { ...item, appointment_time: response.data.appointment_time } : item))
                // success(response.message)
                // navigate('/admin/hospital/list')
            } else {
                alert(response.message)
            }

        } catch (error) {
            console.log(error)
            stopLoading()
            alert("Please Try Again!")
        }
    };

    // Generate options for 24-hour time format (00:00 to 23:59)
    const generateTimeOptions = () => {
        const times = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');
                times.push(`${formattedHour}:${formattedMinute}`);
            }
        }
        return times;
    };


    const handleChange = async (date, id) => {
        // const formattedDate = moment(date).format('DD-MM-YYYY');
        console.log("🚀 ~ handleChange ~ date:", date, id)
        if (date) {
            setSelectedDate(date);
            setVisibleRowId(null);
            console.log("🚀 ~ handleChange ~ date:", date)
            const formattedDate = moment(date).format('DD-MM-YYYY');
            console.log("🚀 ~ handleChange ~ formattedDate:", formattedDate)
            try {
                startLoading()
                const response = await updateAppointment({ appointment_date: formattedDate, id: id })
                stopLoading()
                if (response.status) {
                    setVisibleRowId(null)
                    setFilteredData(filteredData.map(item => item.id === response.data.id ? { ...item, appointment_date: response.data.appointment_date } : item))
                    // success(response.message)
                    // navigate('/admin/hospital/list')
                } else {
                    alert(response.message)
                }

            } catch (error) {
                console.log(error)
                stopLoading()
                alert("Please Try Again!")
            }
        }
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedStatuses((prev) => [...prev, value]);
        } else {
            setSelectedStatuses((prev) => prev.filter((status) => status !== value));
        }

    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        console.log("🚀 ~ handleSearch ~ value:", value)
        setSearch(value)
        const result = data.filter(row => {
            let name = `${row.first_name}${row.last_name}`
            console.log("🚀 ~ handleSearch ~ name:", name)
            return name.toLowerCase().includes(value)
        })
        console.log("🚀 ~ handleSearch ~ result:", result)
        setFilteredData(result)
    }

    const columns = [
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Sr No.</span>,
            cell: (row, index) => index + 1,
            width: "80px"
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Name</span>,
            width: '220px',
            selector: row => row.name,
            cell: row => (
                <div className="profile-image">
                    <Link style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }} to={`${getRoute('login') == 'doctor' ? `${getRoute()}/profile/${row.id}` : `${getRoute()}/doctor/profile/${row.id}`}`}>
                        <img
                            width={28}
                            height={28}
                            src={getImage(row?.profile?.profile_pic)?.replace("admin", "web")}
                            className="rounded-circle m-r-5"
                            alt="img"
                            style={{objectFit : 'cover'}}
                        />{" "}
                        {`${row.first_name} ${row.last_name}`}
                    </Link>
                </div>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Gender</span>,
            cell: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row?.profile?.gender ? row?.profile?.gender : 'None'}</span>,
            width: "120px"
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Consulting Doctor</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.doctor?.name}</span>,
            width: '220px',
            cell: row => (
                <div className='position-relative d-flex'>
                    <span className={'text-info'} style={{ fontSize: '14px', fontWeight: '500', color: '#2E37A4' }}>
                        {row?.doctor?.profile?.first_name ? `${row?.doctor?.profile?.first_name} ${row?.doctor?.profile?.last_name}` : 'Select'}
                    </span>
                    <div className='dropdown'>
                        {!row.doctor && <button className='dropdown-toggle bg-transparent border-0' data-bs-toggle='dropdown' aria-expanded='false'>
                        </button>}
                        <ul className='dropdown-menu'>
                            {
                                doctors.map((el) => (
                                    <li><button onClick={() => handleUpdateAppointment({ doctor_id: el.id }, row.id)} className='dropdown-item' >{`${el?.profile?.first_name} ${el?.profile?.last_name}`}</button></li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Hospital</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.hospital?.name}</span>,
            width: '200px',
            cell: row => (
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#2E37A4' }} className="__cf_alternat_no__">
                    {row.hospital?.name}
                </div>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Treatment</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.request_type}</span>,
            width: '200px',
            cell: row => (
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#2E37A4' }} className="__cf_alternat_no__">
                    {row.request_type}
                </div>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Contact No</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.phone_no}</span>,
            width: '150px'
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Email</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row?.user?.email}</span>,
            width: '250px'
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Blood Group</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row?.blood_group?.name}</span>,
            width: '150px'
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Status</span>,
            // selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.status}</span>,
            width: '200px',
            cell: row => (
                <div className='position-relative d-flex'>
                    <span className={row.status?.toLowerCase() == 'pending' ? 'text-warning' : row.status?.toLowerCase() == 'cancelled' || row.status?.toLowerCase() == 'reject' ? 'text-danger' : row.status?.toLowerCase() == 'completed' || row.status?.toLowerCase() == 'approved' ? 'text-success' : 'text-info'} style={{ fontSize: '14px', fontWeight: '500', color: '#2E37A4' }}>
                        {row.status}
                    </span>
                    <div className='dropdown'>
                        <button className='dropdown-toggle bg-transparent border-0' data-bs-toggle='dropdown' aria-expanded='false'>
                        </button>
                        <ul className='dropdown-menu'>
                            {/* <li><button className='dropdown-item' onClick={() => handleUpdateAppointment({ status: 'Review' }, row.id)}>Review</button></li> */}
                            <li><button className='dropdown-item' onClick={() => handleUpdateAppointment({ status: 'Pending' }, row.id)}>Pending</button></li>
                            <li><button className='dropdown-item' onClick={() => handleUpdateAppointment({ status: 'Approved' }, row.id)}>Approved</button></li>
                            <li><button className='dropdown-item' onClick={() => handleUpdateAppointment({ status: 'Reject' }, row.id)}>Reject</button></li>
                            <li><button className='dropdown-item' onClick={() => handleUpdateAppointment({ status: 'Cancelled' }, row.id)}>Cancelled</button></li>
                            <li><button className='dropdown-item' onClick={() => handleUpdateAppointment({ status: 'Completed' }, row.id)}>Completed</button></li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Date</span>,
            cell: row => (
                <div className="position-relative datepickers" style={{ fontSize: '14px', color: '#333448', fontWeight: 500 }}>
                    {row?.appointment_date ? (
                        <span>{row.appointment_date}</span>
                    ) : visibleRowId == row.id ? (
                        <DatePicker
                            className="position-absolute"
                            selected={selectedDate}
                            onChange={(e) => handleChange(e, row.id)}
                            minDate={new Date()}
                            inline
                        />
                    ) : (
                        <FaEdit
                            className='ms-2'
                            onClick={() => setVisibleRowId(row.id)}
                            style={{ cursor: 'pointer', color: '#007bff' }}
                        />
                    )}
                </div>
            ),
            width: '150px'
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Time</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row?.appointment_time}</span>,
            cell: row => (
                <div onBlur={() => setVisibleRowId(null)} className="position-relative datepickersTime" style={{ fontSize: '14px', color: '#333448', fontWeight: 500 }}>
                    {row?.appointment_time ? (
                        <span>{row.appointment_time}</span>
                    ) : visibleTimeRowId == row.id ? (
                        <div className="p-4">
                            <select value={selectedTime} onChange={(e) => handleTimeChange(e, row.id)} style={{ fontSize: '14px', padding: '8px' }}>
                                {generateTimeOptions().map((time, index) => (
                                    <option key={index} value={time}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <FaEdit
                            className='ms-2'
                            onClick={() => setVisibleTimeRowId(row.id)}
                            style={{ cursor: 'pointer', color: '#007bff' }}
                        />
                    )}
                </div>
            ),
            width: '120px'
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Query Date</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{moment(row.createdAt).format('DD.MM.YYYY')}</span>,
            width: '140px'
        },
        {
            name: "",
            cell: (row) => (
                <div className="dropdown dropdown-action text-end">
                    <Link
                        to="#"
                        className="action-icon dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        <FaEllipsisVertical />
                    </Link>
                    <div className="dropdown-menu dropdown-menu-end">
                        {/* <Link className="dropdown-item" to={`/admin/appointment/edit/${row?.id}`}>
                            <FaRegPenToSquare className="m-r-5" /> Edit
                        </Link> */}
                        <Link
                            onClick={() => setId(row.id)}
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete_patient"
                        >
                            <FaRegTrashAlt className="m-r-5" /> Delete
                        </Link>
                    </div>
                </div>
            ),
            // button: true,
            width: "100px"
        }
    ]

    const handleGetData = async () => {
        try {
            startLoading()
            const response = await getAppointment(await getRoute())
            stopLoading()

            if (response.status) {
                setSearch("")
                // let data = await response.data.filter((el) => el.createdAt = moment(el.createdAt).format('DD.MM.YYYY'))
                setData(data)
                setFilteredData(response.data)
            } else {
                alert(response.message)
            }
        } catch (error) {
            console.log(error)
            stopLoading()
            alert("Please Try Again!")
        }
    }

    const handleGetDoctorData = async () => {
        try {
            startLoading()
            const response = await getHospitalDoctors()
            stopLoading()

            if (response.status) {
                setDoctors(response.data)
            } else {
                alert(response.message)
            }
        } catch (error) {
            console.log(error)
            stopLoading()
            alert("Please Try Again!")
        }
    }

    const handleDelete = async () => {
        try {
            startLoading()
            const response = await deleteAppointment(id)
            stopLoading()

            if (response.status) {
                success(response.message)
                await handleGetData()
            } else {
                alert(response.message)
            }

        } catch (error) {
            console.log(error)
            stopLoading()
            alert("Please Try Again!")
        }
    }

    useEffect(() => {
        (async () => {
            await handleGetData()
            await handleGetDoctorData()
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
                                        <Link to={`${getRoute()}/appointment/list`}>Appointment </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Appointment List</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card card-table show-entire">
                                <div className="card-body">
                                    {/* Table Header */}
                                    <div className="page-table-header mb-2">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <div className="appointment-table-blk d-flex align-items-center">
                                                    <h3 className='m-0'>Appointments List</h3>
                                                    <div className="appointment-search-blk d-flex align-items-center">
                                                        <div className="top-nav-search table-search-blk">
                                                            <form className='m-0'>
                                                                <input
                                                                    onChange={(e) => handleSearch(e)}
                                                                    value={search}
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Search with name"
                                                                />
                                                                <a className="btn">
                                                                    <img
                                                                        src="/img/icons/search-normal.svg"
                                                                        alt=""
                                                                    />
                                                                </a>
                                                            </form>
                                                        </div>
                                                        <div className="add-group">
                                                            {/* <Link
                                                                to={`${getRoute()}/appointment/add`}
                                                                className="btn btn-primary add-pluss ms-2"
                                                            >
                                                                <img src="/img/icons/plus.svg" alt="" />
                                                            </Link> */}
                                                            <button
                                                                onClick={handleGetData}
                                                                className="btn btn-primary appointment-refresh ms-2"
                                                            >
                                                                <img src="/img/icons/re-fresh.svg" alt="" />
                                                            </button>
                                                            {/* <div className="dropdown dropdown-action text-end w-auto">
                                                                <button type="button" className="action-icon w-auto dropdown-toggle btn btn-primary btn-hover appointment-refresh ms-2" data-bs-toggle="dropdown" >
                                                                    Filter
                                                                </button>
                                                                <div className="dropdown-menu dropdown-menu-start">
                                                                    <lable className='w-100 border-0 bg-transparent outline-0 d-flex gap-2 align-items-center p-2 py-1'>
                                                                        <input className='bg-transparent' type="checkbox" name="status" />
                                                                        <span className='bg-transparent'>Pending</span>
                                                                    </lable>

                                                                    <lable className='w-100 border-0 bg-transparent outline-0 d-flex gap-2 align-items-center p-2 py-1'>
                                                                        <input className='bg-transparent' type="checkbox" name="status" />
                                                                        <span className='bg-transparent'>Resolved</span>
                                                                    </lable>

                                                                    <lable className='w-100 border-0 bg-transparent outline-0 d-flex gap-2 align-items-center p-2 py-1'>
                                                                        <input className='bg-transparent' type="checkbox" name="status" />
                                                                        <span className='bg-transparent'>Review</span>
                                                                    </lable>

                                                                    <lable className='w-100 border-0 bg-transparent outline-0 d-flex gap-2 align-items-center p-2 py-1'>
                                                                        <input className='bg-transparent' type="checkbox" name="status" />
                                                                        <span className='bg-transparent'>Team Appointment</span>
                                                                    </lable>

                                                                </div>

                                                            </div> */}
                                                            <div className="dropdown dropdown-action text-end w-auto">
                                                                <button
                                                                    type="button"
                                                                    className="action-icon w-auto dropdown-toggle btn btn-primary btn-hover appointment-refresh ms-2"
                                                                    data-bs-toggle="dropdown"
                                                                >
                                                                    Filter
                                                                </button>
                                                                <div className="dropdown-menu dropdown-menu-start">
                                                                    {['all', 'pending', 'resolved', 'review', 'team-appointment',].map((status) => (
                                                                        <label
                                                                            key={status}
                                                                            className="w-100 border-0 bg-transparent outline-0 d-flex gap-2 align-items-center p-2 py-1"
                                                                        >
                                                                            <input
                                                                                className="bg-transparent"
                                                                                type="checkbox"
                                                                                name="status"
                                                                                value={status}
                                                                                checked={selectedStatuses.includes(status)}
                                                                                onChange={handleCheckboxChange}
                                                                            />
                                                                            <span className="bg-transparent">
                                                                                {status.replace(/[_-]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                                                                            </span>
                                                                        </label>
                                                                    ))}
                                                                    <div className='d-flex justify-content-end'>
                                                                        <button style={{ color: '#2E37A4' }} className="mt-1 w-auto text-center border-0 bg-transparent outline-0 d-flex gap-2 align-items-center p-2 py-1" onClick={async () => { await setSelectedStatuses([]), await handleGetData() }} >
                                                                            Clear
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                {/* Example: show selected statuses */}
                                                                {/* <p className="mt-2">Selected: {JSON.stringify(selectedStatuses)}</p> */}
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-end float-end ms-auto download-grp">
                                                <a href="javascript:;" onClick={() => exportData(data, 'pdf', 'appointment')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-01.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'txt', 'appointment')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-02.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'csv', 'appointment')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-03.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'excel', 'appointment')}>
                                                    <img src="/img/icons/pdf-icon-04.svg" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /Table Header */}
                                    <div className="table-responsive">
                                        {filteredData?.length != 0 && <DataTable columns={columns} data={filteredData} pagination highlightOnHover responsive customStyles={{ rows: { style: { minHeight: "72px" } } }} />}
                                    </div>
                                </div>
                            </div>
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
                                <button onClick={() => handleDelete()} type="submit" className="ms-2 btn btn-danger" data-bs-dismiss="modal">
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

export default AppointmentList