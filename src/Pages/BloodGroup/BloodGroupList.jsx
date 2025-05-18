import React, { useEffect, useState } from 'react'
import { deleteBloodGroup, getBloodGroup } from '../../Common/Apis/ApiService'
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
import { bloodGroupList } from '../../Redux/Action';

const BloodGroupList = () => {

    const navigate = useNavigate()
    const bloodgroupData = useSelector(state => state.handle.bloodGroupList);
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
            width: "100px"
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Name</span>,
            selector: row => row.name,
            width : '200px',
            cell: row => (
                <div className="profile-image">
                    <div style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }} to={`${getRoute()}/blood-group/view`}>
                        {row.name}
                    </div>
                </div>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Create Date</span>,
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
                        <Link className="dropdown-item" to={`/admin/blood-group/edit/${row?.id}`}>
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
        setData(bloodgroupData)
        setFilteredData(bloodgroupData)
    }, [bloodgroupData])


    const handleGetData = async () => {
        try {
            startLoading()
            const response = await getBloodGroup()
            stopLoading()

            if (response.status) {
            setSearch("")
            dispatch(bloodGroupList(response.data))
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
            const response = await deleteBloodGroup(id)
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
                                        <Link to="/admin/blood-group/list">Blood Grpups </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Blood Grpups List</li>
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
                                                    <h3>Blood Grpups List</h3>
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
                                                                to={`${getRoute()}/blood-group/add`}
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
                                                <a href="javascript:;" onClick={() => exportData(data, 'pdf', 'bloodgroup')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-01.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'txt', 'bloodgroup')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-02.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'csv', 'bloodgroup')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-03.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'excel', 'bloodgroup')}>
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

export default BloodGroupList