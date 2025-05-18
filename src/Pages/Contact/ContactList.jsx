import React, { useEffect, useState } from 'react'
import { deleteContact, getContact, getFilterContact, updateContact } from '../../Common/Apis/ApiService'
import { Link, useNavigate } from 'react-router'
import { useAlert } from '../../Common/Toasts/AlertProvider'
import { useSuccess } from '../../Common/Toasts/SuccessProvider'
import { useLoader } from '../../Common/Loader/useLoader'
import DataTable from "react-data-table-component"
import { FaAngleDown, FaRegTrashAlt } from 'react-icons/fa'
import moment from 'moment';
import { FaEllipsisVertical, FaRegPenToSquare } from 'react-icons/fa6'
import { exportData, getRoute } from '../../Common/Handler'
import { useDispatch, useSelector } from 'react-redux'
import { contactList } from '../../Redux/Action';

const ContactList = () => {

    const navigate = useNavigate()
    const contactData = useSelector(state => state.handle.contactList);
    console.log("🚀 ~ ContactList ~ contactData:", contactData)
    let dispatch = useDispatch()

    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();
    const [data, setData] = useState([])
    const [search, setSearch] = useState("")
    const [filteredData, setFilteredData] = useState(data)
    const [id, setId] = useState(null)
    const [selectedStatuses, setSelectedStatuses] = useState([]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;

        if (checked) {
            setSelectedStatuses((prev) => [...prev, value]);
        } else {
            setSelectedStatuses((prev) => prev.filter((status) => status !== value));
        }

    };

    useEffect(() => {
        if (selectedStatuses?.length != 0) {
            (async () => {
                try {
                    startLoading()
                    const response = await getFilterContact({ status: selectedStatuses })
                    stopLoading()

                    if (response.status) {
                        setSearch("")
                        stopLoading()
                        dispatch(contactList(response.data))
                        // setData(data)
                        // setFilteredData(data)

                    } else {
                        alert(response.message)
                    }

                } catch (error) {
                    console.log(error)
                    stopLoading()
                    alert("Please Try Again!")
                }
            })()
        }
        console.log(selectedStatuses, 'selectedStatuses')
    }, [selectedStatuses])


    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        setSearch(value)
        const result = data.filter(row => {
            let name = `${row.first_name}${row.last_name}`
            return name.toLowerCase().includes(value)
        })
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
                    <div style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }} to={`${getRoute()}/contact/view`}>
                        {`${row.first_name} ${row.last_name}`}
                    </div>
                </div>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Email</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.email}</span>,
            width: '300px'
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Contact No</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.phone_no}</span>,
            width: '200px',
            cell: row => (
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#2E37A4' }} className="__cf_alternat_no__">
                    {row.phone_no}
                </div>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Message</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.message}</span>,
            width: '360px'
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Status</span>,
            selector: row => <span style={{ fontSize: '14px', color: '#333448', fontWeight: '500' }}>{row.status}</span>,
            width: '250px',
            cell: row => (
                <div className='position-relative d-flex'>
                    <span className={row.status?.toLowerCase() == 'pending' ? 'text-warning' : row.status?.toLowerCase() == 'resolved' ? 'text-success' : row.status?.toLowerCase() == 'team-contact' && 'text-info'} style={{ fontSize: '14px', fontWeight: '500', color: '#2E37A4' }}>
                        {row.status?.toLowerCase() == 'team-contact' ? 'Team Will Contact You' : row.status}
                    </span>
                    <div className='dropdown'>
                        <button className='dropdown-toggle bg-transparent border-0' data-bs-toggle='dropdown' aria-expanded='false'>
                        </button>
                        <ul className='dropdown-menu'>
                            <li><button className='dropdown-item' onClick={() => handleChangeStatus(row.id, 'review')}>Review</button></li>
                            <li><button className='dropdown-item' onClick={() => handleChangeStatus(row.id, 'team-contact')}>Team Will Contact You</button></li>
                            <li><button className='dropdown-item' onClick={() => handleChangeStatus(row.id, 'resolved')}>Resolved</button></li>
                        </ul>
                    </div>
                </div>
            )
        },
        {
            name: <span style={{ fontWeight: '600', fontSize: '14px', color: '#333448' }}>Query Date</span>,
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
                        {/* <Link className="dropdown-item" to={`/admin/contact/edit/${row?.id}`}>
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

    useEffect(() => {
        setSearch("")
        setData(contactData)
        setFilteredData(contactData)
    }, [contactData])


    const handleGetData = async () => {
        try {
            setSelectedStatuses([])
            startLoading()
            const response = await getContact('all')
            stopLoading()

            if (response.status) {
                setSearch("")
                console.log("🚀 ~ handleGetData ~ data: neww-------", response.data)
                dispatch(contactList(response.data))
                // setData(data)
                // setFilteredData(data)

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
            const response = await deleteContact(id)
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

    const handleChangeStatus = async (id, status) => {
        try {
            startLoading()
            const response = await updateContact({ id, status })
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
                                        <Link to={`${getRoute()}/contact/list`}>Contacts </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Contacts List</li>
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
                                                <div className="contact-table-blk d-flex align-items-center">
                                                    <h3 className='m-0'>Contacts List</h3>
                                                    <div className="contact-search-blk d-flex align-items-center">
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
                                                            {/* <Link
                                                                to={`${getRoute()}/contact/add`}
                                                                className="btn btn-primary add-pluss ms-2"
                                                            >
                                                                <img src="/img/icons/plus.svg" alt="" />
                                                            </Link> */}
                                                            <button
                                                                onClick={handleGetData}
                                                                className="btn btn-primary contact-refresh ms-2"
                                                            >
                                                                <img src="/img/icons/re-fresh.svg" alt="" />
                                                            </button>
                                                            {/* <div className="dropdown dropdown-action text-end w-auto">
                                                                <button type="button" className="action-icon w-auto dropdown-toggle btn btn-primary btn-hover contact-refresh ms-2" data-bs-toggle="dropdown" >
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
                                                                        <span className='bg-transparent'>Team Contact</span>
                                                                    </lable>

                                                                </div>

                                                            </div> */}
                                                            <div className="dropdown dropdown-action text-end w-auto">
                                                                <button
                                                                    type="button"
                                                                    className="action-icon w-auto dropdown-toggle btn btn-primary btn-hover contact-refresh ms-2"
                                                                    data-bs-toggle="dropdown"
                                                                >
                                                                    Filter
                                                                </button>
                                                                <div className="dropdown-menu dropdown-menu-start">
                                                                    {['all', 'pending', 'resolved', 'review', 'team-contact',].map((status) => (
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
                                                <a href="javascript:;" onClick={() => exportData(data, 'pdf', 'contact')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-01.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'txt', 'contact')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-02.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'csv', 'contact')} className=" me-2">
                                                    <img src="/img/icons/pdf-icon-03.svg" alt="" />
                                                </a>
                                                <a href="javascript:;" onClick={() => exportData(data, 'excel', 'contact')}>
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

export default ContactList