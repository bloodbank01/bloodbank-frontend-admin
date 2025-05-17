import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router';
import { useAlert } from '../../Common/Toasts/AlertProvider';
import { useSuccess } from '../../Common/Toasts/SuccessProvider';
import { useLoader } from '../../Common/Loader/useLoader';
import { addBloodGroup, getBloodGroupById, updateBloodGroup } from '../../Common/Apis/ApiService';
import { useParams } from 'react-router-dom';

const EditBloodGroup = () => {

    const navigate = useNavigate()

    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();
    const [data, setData] = useState(null)
    const params = useParams();

    const validationSchema = Yup.object({
        name: Yup.string().required('BloodGroup Name is required')
    });

    useEffect(() => {
        (async () => {
            await handleGet()
        })()
    }, [])

    const handleGet = async () => {
        try {
            const { id } = params;

            startLoading()
            const response = await getBloodGroupById(id)
            stopLoading()

            if (response.status) {
                setData(response.data)
            } else {
                alert(response.message)
            }
            console.log("🚀 ~ handleGet ~ response.data:", response.data)

        } catch (error) {
            console.log(error)
            stopLoading()
            alert("Please Try Again!")
        }
    }

    const handleSubmit = async (data) => {
        try {
            const { id } = params;
            startLoading()
            const response = await updateBloodGroup({ ...data, id })
            stopLoading()
            if (response.status) {
                success(response.message)
                navigate('/admin/blood-group/list')
            } else {
                alert(response.message)
            }

        } catch (error) {
            console.log(error)
            stopLoading()
            alert("Please Try Again!")
        }
    }

    const initialValues = {
        name: data?.name ?? '',
    }



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
                                        <Link to="/admin/blood-group/list">BloodGroups </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Add BloodGroup</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    {data &&
                                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} >
                                            <Form>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="form-heading"><h4>Blood Group Details</h4></div>
                                                    </div>

                                                    <div className="col-12 d-flex flex-wrap justify-content-between">
                                                        <div className="col-md-6 col-xl-4">
                                                            <div className="input-block local-forms">
                                                                <label>Blood Group Name <span className="login-danger">*</span></label>
                                                                <Field className="form-control" name="name" type="text" />
                                                                <ErrorMessage name="name" component="div" className="text-danger" />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-6 col-xl-4">
                                                            <div className="doctor-submit text-end">
                                                                <button type="submit" className="btn btn-primary submit-form me-2">Submit</button>
                                                                <button onClick={() => navigate('/admin/blood-group/list')} type="reset" className="btn btn-primary cancel-form">Cancel</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        </Formik>
                                    }
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

export default EditBloodGroup