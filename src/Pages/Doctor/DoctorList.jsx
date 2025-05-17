import React, { useEffect, useState } from 'react'
import { deleteDoctor, deleteHospital, getDoctor, getHospital } from '../../Common/Apis/ApiService'
import { Link, useNavigate } from 'react-router'
import { useAlert } from '../../Common/Toasts/AlertProvider'
import { useSuccess } from '../../Common/Toasts/SuccessProvider'
import { useLoader } from '../../Common/Loader/useLoader'
import DataTable from "react-data-table-component"
import { FaRegTrashAlt } from 'react-icons/fa'
import moment from 'moment';
import { FaEllipsisVertical, FaRegPenToSquare } from 'react-icons/fa6'
import { exportData, getImage, getRoute } from '../../Common/Handler'
import { useDispatch, useSelector } from 'react-redux'
import { doctorList } from '../../Redux/Action';

const DoctorList = () => {

    const navigate = useNavigate()
    const doctorData = useSelector(state => state.handle.doctorList);
    console.log("🚀 ~ HospitalList ~ doctorData:", doctorData)
    let dispatch = useDispatch()

    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [filteredData, setFilteredData] = useState(data)
    const [id, setId] = useState(null)

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearch(value);

        const result = data.filter(row => {
            console.log(row)
            const name = `${row?.profile?.first_name} ${row?.profile?.last_name}`;
            return name.toLowerCase().includes(value);
        });

        setFilteredData(result);
    };

    const columns = [
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Sr No.</span>,
            cell: (row, index) => index + 1,
            width: "80px"
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Name</span>,
            selector: row => row?.profile?.first_name,
            width: '250px',
            cell: row => (
                <div className="profile-image">
                    <Link style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }} to={`${getRoute('login') == 'doctor' ? `${getRoute()}/profile/${row.id}` : `${getRoute()}/doctor/profile/${row.id}`}`}>
                        <img
                            width={28}
                            height={28}
                            src={getImage(row?.profile?.profile_pic)}
                            className="rounded-circle m-r-5"
                            alt="img"
                        />{" "}
                        {`${row?.profile?.first_name} ${row?.profile?.last_name}`}
                    </Link>
                </div>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Designation</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row?.profile?.designation}</span>
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Date of Birth</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row?.profile?.dob}</span>,
            width: '200px',
            cell: row => (
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#2E37A4' }} className="__cf_alternat_no__">
                    {row?.profile?.dob}
                </div>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Contact No</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row?.address?.phone_no}</span>
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Gender</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row?.profile?.gender}</span>,
            cell: row => <span style={{ fontSize: '14px', fontWeight: '500', color: '#2E37A4' }}>{row?.profile?.gender}</span>
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Hospital Name</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row?.hospital?.name}</span>,
            width: '200px',
            cell: row => (
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#2E37A4' }} className="__cf_alternat_no__">
                    {row?.hospital?.name}
                </span>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Joining Date</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row?.createdAt}</span>
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
                        <Link className="dropdown-item" to={`${getRoute('login') == 'doctor' ? `${getRoute()}/edit/${row?.id}` : `${getRoute()}/doctor/edit/${row?.id}`}`}>
                            <FaRegPenToSquare className="m-r-5" /> Edit
                        </Link>
                        <Link
                            onClick={() => setId(row?.id)}
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

    useEffect(() => {
        setSearch("")
        let data = doctorData && doctorData.filter((el) => el.createdAt = moment(el.createdAt).format('DD.MM.YYYY'))
        setData(data)
        setFilteredData(data)
    }, [doctorData])

    useEffect(() => {
        handleGetData()
    }, [])


    const handleGetData = async () => {
        try {
            startLoading()
            const response = await getDoctor()
            stopLoading()

            console.log("🚀 ~ handleGetData ~ response.data:", response.data)
            if (response.status) {
                setSearch("")
                // let data = await response.data.filter((el) => el.createdAt = moment(el?.createdAt).format('DD.MM.YYYY'))
                dispatch(doctorList(response.data.filter(async (el) => el.createdAt = await moment(el?.createdAt).format('DD.MM.YYYY'))))
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
            const response = await deleteDoctor(id)
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
                                        <Link to={`${getRoute('login') == 'doctor' ? '' : '/admin'}/doctor/list`}>Doctors </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Doctors List</li>
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
                                    <div className="page-table-header mb-4">
                                        <div className="row align-items-center">
                                            <div className="col">
                                                <div className="doctor-table-blk">
                                                    <h3>Doctors List</h3>
                                                    <div className="doctor-search-blk">
                                                        <div className="top-nav-search table-search-blk">
                                                            <form>
                                                                <input
                                                                    onChange={handleSearch}
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
                                                            <Link
                                                                to={`${getRoute('login') == 'doctor' ? '' : '/admin'}/doctor/add`}
                                                                className="btn btn-primary add-pluss ms-2"
                                                            >
                                                                <img src="/img/icons/plus.svg" alt="" />
                                                            </Link>
                                                            <button
                                                                onClick={handleGetData}
                                                                className="btn btn-primary doctor-refresh ms-2"
                                                            >
                                                                <img src="/img/icons/re-fresh.svg" alt="" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-end float-end ms-auto download-grp">
                                                <a href="javascript:;" onClick={() => exportData(data, 'pdf', 'doctor')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-01.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'txt', 'doctor')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-02.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'csv', 'doctor')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-03.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'excel', 'doctor')}>
                                                    <img src="/img/icons/pdf-icon-04.svg" alt="" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        {filteredData.length != 0 && <DataTable columns={columns} data={filteredData} pagination highlightOnHover responsive customStyles={{ rows: { style: { minHeight: "72px" } } }} />}
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
                                <button onClick={handleDelete} type="submit" className="btn btn-danger ms-2" data-bs-dismiss="modal">
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

export default DoctorList