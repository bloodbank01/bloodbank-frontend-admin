import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate, useParams } from 'react-router'
import { useAlert } from '../../Common/Toasts/AlertProvider'
import { useSuccess } from '../../Common/Toasts/SuccessProvider'
import { useLoader } from '../../Common/Loader/useLoader'
import { addDoctor, getDoctorById, updateDoctor } from '../../Common/Apis/ApiService'
import { useSelector } from 'react-redux'
import { getRoute } from '../../Common/Handler'

const EditDoctor = () => {

    const navigate = useNavigate()

    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();
    const [data, setData] = useState(null)

    const hospitalData = useSelector(state => state.handle.hospitalList);
    const params = useParams();

    const initialValues = {
        first_name: data?.profile?.first_name,
        last_name: data?.profile?.last_name,
        username: data?.username,
        phone_no: data?.address?.phone_no,
        email: data?.email,
        dob: data?.profile?.dob,
        gender: data?.profile?.gender,
        hospital_id: data?.hospital?.id,
        designation: data?.profile?.designation
    }

    const validationSchema = Yup.object({
        first_name: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
        last_name: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
        username: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
        phone_no: Yup.string().matches(/^[0-9]{9,11}$/, 'Must be a number between 9 and 11 digits').required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        dob: Yup.string().required('Required'),
        designation: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
        gender: Yup.string().required('Required'),
        hospital_id: Yup.string().required('Required'),
    })

    useEffect(() => {
        (async () => {
            try {
                const { id } = params;

                startLoading()
                const response = await getDoctorById(id)
                console.log("🚀 ~ response:", response)
                stopLoading()

                if (response.status) {
                    setData(response.data)
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


    const onSubmit = async (data) => {
        try {
            const { id } = params;
            delete data.email
            startLoading()
            const response = await updateDoctor({...data, id})
            stopLoading()

            if (response.status) {
                success(response.message)
                navigate(`${getRoute('login') == 'doctor' ? '' : '/admin' }/doctor/list`)
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
            <div className="page-wrapper">
                <div className="content">
                    {/* Page Header */}
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <Link to="/">Doctors </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Add Doctor</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* /Page Header */}
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    {data && <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                        <Form>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-heading"><h4>Doctor Details</h4></div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-4">
                                                    <div className="input-block local-forms">
                                                        <label>First Name <span className="login-danger">*</span></label>
                                                        <Field name="first_name" className="form-control" type="text" />
                                                        <ErrorMessage name="first_name" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-4">
                                                    <div className="input-block local-forms">
                                                        <label>Last Name <span className="login-danger">*</span></label>
                                                        <Field name="last_name" className="form-control" type="text" />
                                                        <ErrorMessage name="last_name" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-4">
                                                    <div className="input-block local-forms">
                                                        <label>User Name <span className="login-danger">*</span></label>
                                                        <Field name="username" className="form-control" type="text" />
                                                        <ErrorMessage name="username" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-6">
                                                    <div className="input-block local-forms">
                                                        <label>Mobile <span className="login-danger">*</span></label>
                                                        <Field name="phone_no" className="form-control" type="text" />
                                                        <ErrorMessage name="phone_no" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-6">
                                                    <div className="input-block local-forms">
                                                        <label>Email <span className="login-danger">*</span></label>
                                                        <Field disabled name="email" className="form-control" type="email" />
                                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-6">
                                                    <div className="input-block local-forms cal-icon">
                                                        <label>Date Of Birth <span className="login-danger">*</span></label>
                                                        <Field name="dob" className="form-control datetimepicker" type="date" max="2025-05-08" />
                                                        <ErrorMessage name="dob" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-6">
                                                    <div className="input-block select-gender">
                                                        <label className="gen-label">Gender <span className="login-danger">*</span></label>
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label">
                                                                <Field type="radio" name="gender" value="Male" className="form-check-input mt-0" />
                                                                Male
                                                            </label>
                                                        </div>
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label">
                                                                <Field type="radio" name="gender" value="Female" className="form-check-input mt-0" />
                                                                Female
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="gender" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-6">
                                                    <div className="input-block local-forms">
                                                        <label>Hospital <span className="login-danger">*</span></label>
                                                        <Field as="select" name="hospital_id" className="form-control select">
                                                            <option value="">Select Hospital</option>
                                                            {
                                                                hospitalData.map((el) => (
                                                                    <option value={el.id}>{`${el.name}, ${el.address.city}`}</option>
                                                                ))
                                                            }
                                                        </Field>
                                                        <ErrorMessage name="hospital_id" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-6">
                                                    <div className="input-block local-forms">
                                                        <label>Designation <span className="login-danger">*</span></label>
                                                        <Field name="designation" className="form-control" type="text" />
                                                        <ErrorMessage name="designation" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="doctor-submit text-end">
                                                        <button type="submit" className="btn btn-primary submit-form me-2">Submit</button>
                                                        <button onClick={() => navigate(`${getRoute('login') == 'doctor' ? '' : '/admin' }/doctor/list`)} type="reset" className="btn btn-primary cancel-form">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    </Formik>}
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

export default EditDoctor