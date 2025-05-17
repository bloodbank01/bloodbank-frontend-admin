import React, { useState } from 'react'
import { useAlert } from '../../Common/Toasts/AlertProvider'
import { useSuccess } from '../../Common/Toasts/SuccessProvider'
import { useLoader } from '../../Common/Loader/useLoader'
import * as Yup from 'yup';
import EmailSent from '../../Component/EmailSent';
import LinkExpire from '../../Component/LinkExpire';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { resetPassword } from '../../Common/Apis/ApiService';
import { Link } from 'react-router';
import logoImg from '../../../public/img/logo/logo_new.png'

const ResetPassword = () => {

    const [showSentEmailModel, setShowSentEmailModel] = useState(false)
    const [showLinkExpireModel, setShowLinkExpireModel] = useState(false)

    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();

    const validationSchema = Yup.object({
        password: Yup.string().min(6, 'Minimum 6 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character').required('Password is required'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Please confirm your password'),
    });

    const handleSubmit = async (data, actions) => {
        console.log('Form Submitted:', data);
        try {
            const queryParams = new URLSearchParams(window.location.search);
            const access_token = queryParams.get('accessToken');
            const token = queryParams.get('token');
            console.log("🚀 ~ handleSubmit ~ token:", token)

            if (!token || !access_token) {
                alert('Invalid Link!')
            } else {
                startLoading()
                const response = await resetPassword({ ...data, access_token, token })
                stopLoading()
                actions.resetForm()
                if (response.status) {
                    setShowSentEmailModel(true)
                } else {
                    setShowLinkExpireModel(true)
                }
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
                <EmailSent text='Your password has been updated!' subText='Please log in using your email and new password.' setValue={setShowSentEmailModel} navigateTo='/sign-in' />
            }
            {showLinkExpireModel &&
                <LinkExpire setValue={setShowLinkExpireModel} navigateTo='/sign-in' />
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
                                            <h2>Change Password</h2>
                                            {/* Form */}
                                            <Formik initialValues={{ password: '', confirm_password: '' }} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                                {() => (
                                                    <Form>
                                                        <div className="input-block">
                                                            <label>New Password <span className="login-danger">*</span></label>
                                                            <Field className="form-control" type="password" name="password" />
                                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                                        </div>
                                                        <div className="input-block">
                                                            <label>Confirm Password <span className="login-danger">*</span></label>
                                                            <Field className="form-control" type="password" name="confirm_password" />
                                                            <ErrorMessage name="confirm_password" component="div" className="text-danger" />
                                                        </div>
                                                        <div className="input-block login-btn">
                                                            <button className="btn btn-primary btn-block" type="submit">Reset Password</button>
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

export default ResetPassword