import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from '../../Common/Toasts/AlertProvider'
import { useSuccess } from '../../Common/Toasts/SuccessProvider'
import { useLoader } from '../../Common/Loader/useLoader'
import * as Yup from 'yup';
import { signIn } from '../../Common/Apis/ApiService'
import { getRoute } from '../../Common/Handler'
import logoImg from '../../../public/img/logo/logo_new.png'

const SignIn = () => {

    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState('admin');

    const handleTabChange = (role) => {
        setActiveTab(role);
    };


    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
    });

    const handleSubmit = async (data, actions) => {
        try {
            startLoading()
            const response = await signIn({ ...data, type: activeTab })
            stopLoading()

            if (response.status) {
                await localStorage.setItem('token', response.data.jwt)
                await localStorage.setItem('vr', response.data.vr)
                await localStorage.setItem('id', response.data.user.id)

                delete response.data.user.admin_id
                delete response.data.user.login_token
                delete response.data.user.vr
                delete response.data.user.password
                delete response.data.user.updatedAt
                delete response.data.user.createdAt

                await localStorage.setItem('user', JSON.stringify(response.data.user))

                if (response?.data?.type?.toLowerCase() == 'admin') {
                    await localStorage.setItem('is_admin', 'true')
                    await localStorage.setItem('hospital_id', response?.data?.user?.hospital_id)

                } else {
                    await localStorage.setItem('is_doctor', 'true')
                    await localStorage.setItem('hospital_id', response?.data?.user?.hospital_id)
                }

                success(response.message)
                sessionStorage.setItem("justLoggedIn", "true");
                navigate(`/${response?.data?.type?.toLowerCase() === 'admin' ? 'admin' : 'doctor'}`);
            } else {
                alert(response.message)
            }

        } catch (error) {
            console.log(error)
            stopLoading()
            alert("Please Try Again!")
        }
    };

    return (
        <div className="main-wrapper login-body overflow-hidden">
            <div className="container-fluid px-0">
                <div className="row">
                    {/* Login logo */}
                    <div className="col-lg-6 login-wrap">
                        <div className="login-sec">
                            <div className="log-img">
                                <img
                                    className="img-fluid"
                                    src="/img/login-02.png"
                                    alt="Logo"
                                />
                            </div>
                        </div>
                    </div>
                    {/* /Login logo */}
                    {/* Login Content */}
                    <div className="col-lg-6 login-wrap-bg">
                        <div className="login-wrapper">
                            <div className="loginbox">
                                <div className="login-right">
                                    <div className="login-right-wrap">
                                        <div className="account-logo d-flex flex-wrap col-12">
                                            <Link to="/" className='col-6'>
                                                <img style={{ width: '50px' }} src={logoImg} alt="" />
                                                <span className='ms-3' style={{fontSize : '25px', fontWeight : 500}}>
                                                    BloodBank
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="col-12">
                                            <div className="login-wrapper d-flex justify-content-end flex-wrap col-12">
                                                <div className="tab-buttons mb-4 d-flex justify-content-sm-end justify-content-center col-12">
                                                    <button
                                                        className={`btn ${activeTab === 'admin' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                                                        style={{ width: 'auto' }}
                                                        onClick={() => handleTabChange('admin')}
                                                    >
                                                        Admin Login
                                                    </button>
                                                    <button
                                                        className={`btn ${activeTab === 'doctor' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                        style={{ width: 'auto' }}
                                                        onClick={() => handleTabChange('doctor')}
                                                    >
                                                        Doctor Login
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <h2>Login</h2>
                                        {/* Form */}
                                        <Formik initialValues={{ email: 'bloodbank.official.01@gmail.com', password: 'Admin@123' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                            {() => (
                                                <Form>
                                                    <div className="input-block">
                                                        <label>Email <span className="login-danger">*</span></label>
                                                        <Field className="form-control" type="text" name="email" />
                                                        <ErrorMessage name="email" component="div" className="text-danger" />
                                                    </div>
                                                    <div className="input-block">
                                                        <label>Password <span className="login-danger">*</span></label>
                                                        <Field className="form-control pass-input" type="password" name="password" />
                                                        <ErrorMessage name="password" component="div" className="text-danger" />
                                                        <span className="profile-views feather-eye-off toggle-password" />
                                                    </div>
                                                    <div className="forgotpass">
                                                        <Link to="/forgot-password">Forgot Password?</Link>
                                                    </div>
                                                    <div className="input-block login-btn">
                                                        <button className="btn btn-primary btn-block" type="submit">Login</button>
                                                    </div>
                                                </Form>
                                            )}
                                        </Formik>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* /Login Content */}
                </div>
            </div>
        </div>
    )
}

export default SignIn