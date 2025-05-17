import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router'
import { useAlert } from '../../Common/Toasts/AlertProvider'
import { useSuccess } from '../../Common/Toasts/SuccessProvider'
import { useLoader } from '../../Common/Loader/useLoader'
import { addDoctor } from '../../Common/Apis/ApiService'
import { useSelector } from 'react-redux'
import { getRoute } from '../../Common/Handler'

const AddDoctor = () => {

    const navigate = useNavigate()

    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();
    const hospitalData = useSelector(state => state.handle.hospitalList);
    const [state, setState] = useState([
        { "name": "Gujarat" },
        { "name": "Andhra Pradesh" },
        { "name": "Odisha" },
        { "name": "Telangana" },
        { "name": "Kerala" },
        { "name": "Assam" },
        { "name": "Ontario" },
        { "name": "Quebec" },
        { "name": "British Columbia" },
        { "name": "Alberta" },
        { "name": "Manitoba" },
        { "name": "São Paulo" },
        { "name": "Rio de Janeiro" },
        { "name": "Bahia" },
        { "name": "Minas Gerais" },
        { "name": "Paraná" },
        { "name": "Tokyo" },
        { "name": "Osaka" },
        { "name": "Hokkaido" },
        { "name": "Kyoto" },
        { "name": "Fukuoka" },
        { "name": "Bavaria" },
        { "name": "Berlin" },
        { "name": "Hesse" },
        { "name": "Saxony" },
        { "name": "North Rhine-Westphalia" },
        { "name": "New South Wales" },
        { "name": "Victoria" },
        { "name": "Queensland" },
        { "name": "Western Australia" },
        { "name": "South Australia" },
        { "name": "Uttar Pradesh" },
        { "name": "Maharashtra" },
        { "name": "Bihar" },
        { "name": "West Bengal" },
        { "name": "Madhya Pradesh" },
        { "name": "Tamil Nadu" },
        { "name": "Rajasthan" },
        { "name": "Karnataka" },
        { "name": "Punjab" },
        { "name": "Cairo" },
        { "name": "Giza" },
        { "name": "Alexandria" },
        { "name": "Aswan" },
        { "name": "Luxor" },
        { "name": "Île-de-France" },
        { "name": "Provence-Alpes-Côte d'Azur" },
        { "name": "Nouvelle-Aquitaine" },
        { "name": "Occitanie" },
        { "name": "Auvergne-Rhône-Alpes" },
        { "name": "Gauteng" },
        { "name": "Western Cape" },
        { "name": "KwaZulu-Natal" },
        { "name": "Eastern Cape" },
        { "name": "Free State" },
        { "name": "Jalisco" },
        { "name": "Mexico City" },
        { "name": "Nuevo León" },
        { "name": "Puebla" },
        { "name": "Yucatán" }
    ]
    )
    const [city, setCity] = useState([
        { "name": "Surat" },
        { "name": "Rajkot" },
        { "name": "Ahemdabad" },
        { "name": "Bhavanagar" },
        { "name": "Asansol" },
        { "name": "Siliguri" },
        { "name": "Bhopal" },
        { "name": "Indore" },
        { "name": "Jabalpur" },
        { "name": "Gwalior" },
        { "name": "Ujjain" },
        { "name": "Chennai" },
        { "name": "Coimbatore" },
        { "name": "Madurai" },
        { "name": "Tiruchirappalli" },
        { "name": "Salem" },
        { "name": "Jaipur" },
        { "name": "Jodhpur" },
        { "name": "Udaipur" },
        { "name": "Kota" },
        { "name": "Ajmer" },
        { "name": "Bengaluru" },
        { "name": "Toronto" },
        { "name": "Ottawa" },
        { "name": "Montreal" },
        { "name": "Quebec City" },
        { "name": "Vancouver" },
        { "name": "Victoria" },
        { "name": "Calgary" },
        { "name": "Edmonton" },
        { "name": "Winnipeg" },
        { "name": "Brandon" },
        { "name": "São Paulo" },
        { "name": "Campinas" },
        { "name": "Rio de Janeiro" },
        { "name": "Niterói" },
        { "name": "Salvador" },
        { "name": "Feira de Santana" },
        { "name": "Belo Horizonte" },
        { "name": "Uberlândia" },
        { "name": "Curitiba" },
        { "name": "Londrina" },
        { "name": "Tokyo" },
        { "name": "Hachioji" },
        { "name": "Osaka" },
        { "name": "Sakai" },
        { "name": "Sapporo" },
        { "name": "Asahikawa" },
        { "name": "Kyoto" },
        { "name": "Uji" },
        { "name": "Fukuoka" },
        { "name": "Kitakyushu" },
        { "name": "Munich" },
        { "name": "Nuremberg" },
        { "name": "Berlin" },
        { "name": "Spandau" },
        { "name": "Frankfurt" },
        { "name": "Wiesbaden" },
        { "name": "Leipzig" },
        { "name": "Dresden" },
        { "name": "Cologne" },
        { "name": "Düsseldorf" },
        { "name": "Sydney" },
        { "name": "Newcastle" },
        { "name": "Melbourne" },
        { "name": "Geelong" },
        { "name": "Brisbane" },
        { "name": "Gold Coast" },
        { "name": "Perth" },
        { "name": "Fremantle" },
        { "name": "Adelaide" },
        { "name": "Mount Gambier" },
        { "name": "Lucknow" },
        { "name": "Kanpur" },
        { "name": "Varanasi" },
        { "name": "Agra" },
        { "name": "Prayagraj" },
        { "name": "Mumbai" },
        { "name": "Pune" },
        { "name": "Nagpur" },
        { "name": "Nashik" },
        { "name": "Aurangabad" },
        { "name": "Patna" },
        { "name": "Gaya" },
        { "name": "Bhagalpur" },
        { "name": "Muzaffarpur" },
        { "name": "Darbhanga" },
        { "name": "Kolkata" },
        { "name": "Howrah" },
        { "name": "Durgapur" }
    ])
    const [country, setCountry] = useState([
        { "name": "Canada" },
        { "name": "Brazil" },
        { "name": "Japan" },
        { "name": "Germany" },
        { "name": "Australia" },
        { "name": "India" },
        { "name": "Egypt" },
        { "name": "France" },
        { "name": "South Africa" },
        { "name": "Mexico" }
    ]
    )


    const initialValues = {
        first_name: '',
        last_name: '',
        username: '',
        phone_no: '',
        email: '',
        password: '',
        confirm_password: '',
        dob: '',
        gender: '',
        hospital_id: localStorage.getItem('hospital_id') ? localStorage.getItem('hospital_id') : '',
        address: '',
        city: '',
        country: '',
        state: '',
        pincode: '',
        designation: ''
    }

    const validationSchema = Yup.object({
        first_name: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
        last_name: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
        username: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
        phone_no: Yup.string().matches(/^[0-9]{9,11}$/, 'Must be a number between 9 and 11 digits').required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character')
            .required('Required'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
        dob: Yup.string().required('Required'),
        designation: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
        gender: Yup.string().required('Required'),
        hospital_id: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        state: Yup.string().required('Required'),
        pincode: Yup.string().required('Required')
    })

    const onSubmit = async (data) => {
        try {
            startLoading()
            const response = await addDoctor(data)
            stopLoading()

            if (response.status) {
                success(response.message)
                navigate(`${getRoute('login') == 'doctor' ? '' : '/admin'}/doctor/list`)
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
                                        <Link to={`${getRoute('login') == 'doctor' ? '' : '/admin'}/doctor/add`}>Doctors </Link>
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
                                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
                                                        <Field name="email" className="form-control" type="email" />
                                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-6">
                                                    <div className="input-block local-forms">
                                                        <label>Password <span className="login-danger">*</span></label>
                                                        <Field name="password" className="form-control" type="password" />
                                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-6">
                                                    <div className="input-block local-forms">
                                                        <label>Confirm Password <span className="login-danger">*</span></label>
                                                        <Field name="confirm_password" className="form-control" type="password" />
                                                        <ErrorMessage name="confirm_password" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-6">
                                                    <div className="input-block local-forms">
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
                                                                <Field type="radio" name="gender" value="male" className="form-check-input mt-0" />
                                                                Male
                                                            </label>
                                                        </div>
                                                        <div className="form-check-inline">
                                                            <label className="form-check-label">
                                                                <Field type="radio" name="gender" value="female" className="form-check-input mt-0" />
                                                                Female
                                                            </label>
                                                        </div>
                                                        <ErrorMessage name="gender" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-6">
                                                    <div className="input-block local-forms">
                                                        <label>Hospital <span className="login-danger">*</span></label>
                                                        <Field as="select" disabled={getRoute('login') === 'doctor'} name="hospital_id" className="form-control select">
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

                                                <div className="col-12 col-sm-12">
                                                    <div className="input-block local-forms">
                                                        <label>Address <span className="login-danger">*</span></label>
                                                        <Field as="textarea" name="address" className="form-control" rows="3" />
                                                        <ErrorMessage name="address" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-3">
                                                    <div className="input-block local-forms">
                                                        <label>Country <span className="login-danger">*</span></label>
                                                        <Field as="select" name="country" className="form-control select">
                                                            <option value="">Select Country</option>
                                                            {country.map((el) => (
                                                                <option value={el.name}>{el.name}</option>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name="country" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-3">
                                                    <div className="input-block local-forms">
                                                        <label>State/Province <span className="login-danger">*</span></label>
                                                        <Field as="select" name="state" className="form-control select">
                                                            <option value="">Select State</option>
                                                            {state.map((el) => (
                                                                <option value={el.name}>{el.name}</option>
                                                            ))}

                                                        </Field>
                                                        <ErrorMessage name="state" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-3">
                                                    <div className="input-block local-forms">
                                                        <label>City <span className="login-danger">*</span></label>
                                                        <Field as="select" name="city" className="form-control select">
                                                            <option value="">Select City</option>
                                                            {city.map((el) => (
                                                                <option value={el.name}>{el.name}</option>
                                                            ))}
                                                        </Field>
                                                        <ErrorMessage name="city" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12 col-md-6 col-xl-3">
                                                    <div className="input-block local-forms">
                                                        <label>Postal Code <span className="login-danger">*</span></label>
                                                        <Field name="pincode" className="form-control" type="text" />
                                                        <ErrorMessage name="pincode" component="div" className="text-danger" />
                                                    </div>
                                                </div>

                                                <div className="col-12">
                                                    <div className="doctor-submit text-end">
                                                        <button type="submit" className="btn btn-primary submit-form me-2">Submit</button>
                                                        <button onClick={() => navigate(`${getRoute('login') == 'doctor' ? '' : '/admin'}/doctor/list`)} type="reset" className="btn btn-primary cancel-form">Cancel</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    </Formik>
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

export default AddDoctor