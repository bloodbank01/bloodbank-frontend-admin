import React, { useEffect, useState } from 'react'
import { deleteHospital, getHospital } from '../../Common/Apis/ApiService'
import { Link, useNavigate } from 'react-router'
import { useAlert } from '../../Common/Toasts/AlertProvider'
import { useSuccess } from '../../Common/Toasts/SuccessProvider'
import { useLoader } from '../../Common/Loader/useLoader'
import DataTable from "react-data-table-component"
import { FaRegTrashAlt } from 'react-icons/fa'
import moment from 'moment';
import { FaEllipsisVertical, FaRegPenToSquare } from 'react-icons/fa6'
import { exportData, getRoute } from '../../Common/Handler'
import { useDispatch, useSelector } from 'react-redux'
import { hospitalList } from '../../Redux/Action';

const HospitalList = () => {

    const navigate = useNavigate()
    const hospitalData = useSelector(state => state.handle.hospitalList);
    console.log("🚀 ~ HospitalList ~ hospitalData:", hospitalData)
    let dispatch = useDispatch()

    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [filteredData, setFilteredData] = useState(data)
    const [id, setId] = useState(null)

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        setSearch(value)
        const result = data.filter(row =>
            row.name.toLowerCase().includes(value)
        )
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
            selector: row => row.name,
            cell: row => (
                <div className="profile-image">
                    <div style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }} to={`${getRoute()}/hospital/view`}>
                        {row.name}
                    </div>
                </div>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Type</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.type}</span>
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Website</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.website}</span>,
            width: '280px',
            cell: row => (
                <Link target='_blank' to={row.website} style={{ fontSize: '14px', fontWeight: '500', color: '#2E37A4' }} className="__cf_alternat_no__">
                    {row.website}
                </Link>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Doctors</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.doctors.length}</span>
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Contact No</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.contact_no}</span>,
            cell: row => <span style={{ fontSize: '14px', fontWeight: '500', color: '#2E37A4' }}>{row.contact_no}</span>
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Alternat Contact No</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.alternat_no}</span>,
            cell: row => (
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#2E37A4' }} className="__cf_alternat_no__">
                    {row.alternat_no}
                </span>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Joining Date</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{moment(row.createdAt).format('DD.MM.YYYY')}</span>
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
                        <Link className="dropdown-item" to={`/admin/hospital/edit/${row?.id}`}>
                            <FaRegPenToSquare className="m-r-5" /> Edit
                        </Link>
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

    useEffect(() => {
        setSearch("")
        // let data = hospitalData && hospitalData.filter((el) => el.createdAt = moment(el.createdAt).format('DD.MM.YYYY'))
        setData(hospitalData)
        setFilteredData(hospitalData)
    }, [hospitalData])


    const handleGetData = async () => {
        try {
            startLoading()
            const response = await getHospital()
            stopLoading()

            if (response.status) {
            setSearch("")
            // let data = await response.data.filter((el) => el.createdAt = moment(el.createdAt).format('DD.MM.YYYY'))
            dispatch(hospitalList(response.data))
            setData(response.data)
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

    const handleDelete = async () => {
        try {
            startLoading()
            const response = await deleteHospital(id)
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
                                        <Link to="/">Hospitals </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Hospitals List</li>
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
                                                <div className="hospital-table-blk d-flex align-items-center">
                                                    <h3 className='m-0'>Hospitals List</h3>
                                                    <div className="hospital-search-blk d-flex align-items-center">
                                                        <div className="top-nav-search table-search-blk">
                                                            <form className='m-0'>
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
                                                                to={`${getRoute()}/hospital/add`}
                                                                className="btn btn-primary add-pluss ms-2"
                                                            >
                                                                <img src="/img/icons/plus.svg" alt="" />
                                                            </Link>
                                                            <button
                                                                onClick={handleGetData}
                                                                className="btn btn-primary hospital-refresh ms-2"
                                                            >
                                                                <img src="/img/icons/re-fresh.svg" alt="" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-auto text-end float-end ms-auto download-grp">
                                                <a href="javascript:;" onClick={() => exportData(data, 'pdf', 'hospital')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-01.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'txt', 'hospital')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-02.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'csv', 'hospital')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-03.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'excel', 'hospital')}>
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

export default HospitalList