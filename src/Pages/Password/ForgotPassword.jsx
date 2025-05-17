import React, { useState } from 'react'
import { useSuccess } from '../../Common/Toasts/SuccessProvider';
import { useLoader } from '../../Common/Loader/useLoader';
import * as Yup from 'yup';
import { useAlert } from '../../Common/Toasts/AlertProvider';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import { forgotPassword } from '../../Common/Apis/ApiService';
import EmailSent from '../../Component/EmailSent';
import { Link } from 'react-router';
import logoImg from '../../../public/img/logo/logo_new.png'

const ForgotPassword = () => {

    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();
    const [showSentEmailModel, setShowSentEmailModel] = useState(false)
    const [activeTab, setActiveTab] = useState('admin');

    const handleTabChange = (role) => {
        setActiveTab(role);
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required'),
    });

    const handleSubmit = async (data, actions) => {
        try {
            startLoading()
            const response = await forgotPassword({ ...data, type : activeTab })
            stopLoading()
            actions.resetForm()

            if (response.status) {
                setShowSentEmailModel(true)
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
        <>
            {showSentEmailModel &&
                <EmailSent text='Reset password link has been sent to your email' setValue={setShowSentEmailModel} navigateTo='/sign-in' />
            }
            <div className="main-wrapper login-body">
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
                                            <div className="account-logo">
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
                                                            For Admin
                                                        </button>
                                                        <button
                                                            className={`btn ${activeTab === 'doctor' ? 'btn-primary' : 'btn-outline-primary'}`}
                                                            style={{ width: 'auto' }}
                                                            onClick={() => handleTabChange('doctor')}
                                                        >
                                                            For Doctor
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <h2>Reset Password</h2>
                                            {/* Form */}
                                            <Formik initialValues={{ email: '' }} validationSchema={validationSchema} onSubmit={handleSubmit} >
                                                {() => (
                                                    <Form>
                                                        <div className="input-block">
                                                            <label>
                                                                Email <span className="login-danger">*</span>
                                                            </label>
                                                            <Field
                                                                className="form-control"
                                                                type="email"
                                                                name="email"
                                                                placeholder="Enter your email"
                                                            />
                                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                                        </div>

                                                        <div className="input-block login-btn">
                                                            <button className="btn btn-primary btn-block" type="submit">
                                                                Reset Password
                                                            </button>
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
        </>
    )
}

export default ForgotPassword