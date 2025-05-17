import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import { useAlert } from '../../Common/Toasts/AlertProvider';
import { useSuccess } from '../../Common/Toasts/SuccessProvider';
import { useLoader } from '../../Common/Loader/useLoader';
import { getProfile, updateAdminProfile, updateProfilePic } from '../../Common/Apis/ApiService';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../../Redux/Action';

const EditProfile = () => {

    const navigate = useNavigate()
    let dispatch = useDispatch()
    const profile = useSelector(state => state.handle.profile);
    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();
    const [profilePic, setProfilePic] = useState(profile.profile_pic)
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

    useEffect(() => {
        (async () => {
            try {
                console.log('call api')
                startLoading()
                const response = await getProfile()
                stopLoading()
                if (response.status) {
                    setProfilePic(response.data.profile_pic)
                    dispatch(userProfile(response.data))
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

    console.log("🚀 ~ EditProfile ~ profile:", profile)

    const handleSubmit = async (data, action) => {
        try {
            startLoading()
            const response = await updateAdminProfile({ ...data })
            stopLoading()

            if (response.status) {
                success(response.message)
                navigate('/admin/profile')
            } else {
                alert(response.message)
            }

        } catch (error) {
            console.log(error)
            stopLoading()
            alert("Please Try Again!")
        }
    };

    const handleFileSelect = async (e) => {
        try {
            console.log('object')
            const formData = new FormData();
            formData.append('file', e.target.files[0]);
            console.log(formData)
            startLoading()
            const response = await updateProfilePic(formData)
            stopLoading()

            if (response.status) {
                dispatch(userProfile({ ...profile, profile_pic: response.data.profile_pic }))
                setProfilePic(response.data.profile_pic)
                console.log(profilePic, 'hello profilePic')
                success(response.message)
            } else {
                alert(response.message)
            }

        } catch (error) {
            console.log(error)
            stopLoading()
            alert("Please Try Again!")
        }
    };

    const validationSchema = Yup.object({
        first_name: Yup.string().min(3, 'Minimum length should be 3').max(15, 'Maximum length should be 15').required('Required'),
        last_name: Yup.string().min(3, 'Minimum length should be 3').max(15, 'Maximum length should be 15').required('Required'),
        dob: Yup.string().required('Required'),
        gender: Yup.string().required('Required'),
        address: Yup.string().min(3, 'Minimum length should be 3').max(50, 'Maximum length should be 50').required('Required'),
        state: Yup.string().required('Required'),
        country: Yup.string().required('Required'),
        pincode: Yup.string().required('Required'),
        phone_no: Yup.string().matches(/^[0-9]+$/, 'Phone number must be only digits').min(9, 'Minimum length should be 9').max(11, 'Maximum length should be 11').required('Required'),
        // institution: Yup.string().required('Required'),
        // subject: Yup.string().required('Required'),
        // startDate: Yup.string().required('Required'),
        // complete_date: Yup.string().required('Required'),
        // degree: Yup.string().required('Required'),
        // grade: Yup.string().required('Required'),
        // company_name: Yup.string().required('Required'),
        // location: Yup.string().required('Required'),
        // position: Yup.string().required('Required'),
        // period_from: Yup.string().required('Required'),
        // period_to: Yup.string().required('Required'),
    })

    const initialValues = {
        first_name: profile?.first_name,
        last_name: profile?.last_name,
        dob: profile?.dob,
        gender: profile?.gender,
        address: profile?.address?.address,
        state: profile?.address?.state,
        country: profile?.address?.country,
        city: profile?.address?.country,
        pincode: profile?.address?.pincode,
        phone_no: profile?.address?.phone_no,
        description: profile?.description,
        // institution: 'Oxford University',
        // subject: 'Computer Science',
        // startDate: '01/06/2002',
        // complete_date: '31/05/2006',
        // degree: 'BE Computer Science',
        // grade: 'Grade A',
        // company_name: 'Digital Devlopment Inc',
        // location: 'United States',
        // position: 'Web Developer',
        // period_from: '01/07/2007',
        // period_to: '08/06/2018'
    }

    return (
        <div className="page-wrapper">
            <div className="content">
                {/* Page Header */}
                <div className="page-header">
                    <div className="row">
                        <div className="col-sm-12">
                            <ul className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/admin">Dashboard </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <i className="feather-chevron-right" />
                                </li>
                                <li className="breadcrumb-item active">Edit Profile</li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* /Page Header */}
                {profile && Object.keys(profile).length > 0 && (
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="card-box">
                                    <h3 className="card-title">Basic Informations</h3>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="profile-img-wrap">
                                                <img style={{ objectFit: 'cover' }} className="inline-block" src={profilePic} alt="user" />
                                                <div className="fileupload btn" style={{ width: '45px', padding: '2px', color: 'white' }}>
                                                    edit
                                                    <input className="upload" type="file" onChange={handleFileSelect} />
                                                </div>
                                            </div>
                                            <div className="profile-basic">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="input-block local-forms">
                                                            <label className="focus-label">First Name</label>
                                                            <Field type="text" name="first_name" className="form-control floating" />
                                                            <ErrorMessage name="first_name" component="div" className="text-danger" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="input-block local-forms">
                                                            <label className="focus-label">Last Name</label>
                                                            <Field type="text" name="last_name" className="form-control floating" />
                                                            <ErrorMessage name="last_name" component="div" className="text-danger" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="input-block local-forms">
                                                            <label className="focus-label">Birth Date</label>
                                                            <Field type="text" name="dob" className="form-control floating datetimepicker" />
                                                            <ErrorMessage name="dob" component="div" className="text-danger" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="input-block local-forms">
                                                            <label className="focus-label">Gender</label>
                                                            <Field as="select" name="gender" className="form-control select">
                                                                <option value="">Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                            </Field>
                                                            <ErrorMessage name="gender" component="div" className="text-danger" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12 col-sm-12">
                                                <div className="input-block local-forms">
                                                    <label>Description <span className="login-danger">*</span></label>
                                                    <Field as="textarea" name="description" className="form-control" rows="3" />
                                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-box">
                                    <h3 className="card-title">Contact Informations</h3>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="input-block local-forms">
                                                <label className="focus-label">Address</label>
                                                <Field type="text" name="address" className="form-control floating" />
                                                <ErrorMessage name="address" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="input-block local-forms">
                                                <label className="focus-label">Phone Number</label>
                                                <Field type="text" name="phone_no" className="form-control floating" />
                                                <ErrorMessage name="phone_no" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
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
                                        <div className="col-md-6">
                                            <div className="input-block local-forms">
                                                <label>State <span className="login-danger">*</span></label>
                                                <Field as="select" name="state" className="form-control select">
                                                    <option value="">Select State</option>
                                                    {state.map((el) => (
                                                        <option value={el.name}>{el.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="state" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
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
                                        <div className="col-md-6">
                                            <div className="input-block local-forms">
                                                <label className="focus-label">Pin Code</label>
                                                <Field type="text" name="pincode" className="form-control floating" />
                                                <ErrorMessage name="pincode" component="div" className="text-danger" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="card-box">
                             <h3 className="card-title">Education Informations</h3>
                             <div className="row">
                                 <div className="col-md-6">
                                     <div className="input-block local-forms">
                                         <label className="focus-label">Institution</label>
                                         <Field type="text" name="institution" className="form-control floating" />
                                         <ErrorMessage name="institution" component="div" className="text-danger" />
                                     </div>
                                 </div>
                                 <div className="col-md-6">
                                     <div className="input-block local-forms">
                                         <label className="focus-label">Subject</label>
                                         <Field type="text" name="subject" className="form-control floating" />
                                         <ErrorMessage name="subject" component="div" className="text-danger" />
                                     </div>
                                 </div>
                                 <div className="col-md-6">
                                     <div className="input-block local-forms">
                                         <label className="focus-label">Starting Date</label>
                                         <Field type="text" name="startDate" className="form-control floating datetimepicker" />
                                         <ErrorMessage name="startDate" component="div" className="text-danger" />
                                     </div>
                                 </div>
                                 <div className="col-md-6">
                                     <div className="input-block local-forms">
                                         <label className="focus-label">Complete Date</label>
                                         <Field type="text" name="complete_date" className="form-control floating datetimepicker" />
                                         <ErrorMessage name="complete_date" component="div" className="text-danger" />
                                     </div>
                                 </div>
                                 <div className="col-md-6">
                                     <div className="input-block local-forms">
                                         <label className="focus-label">Degree</label>
                                         <Field type="text" name="degree" className="form-control floating" />
                                         <ErrorMessage name="degree" component="div" className="text-danger" />
                                     </div>
                                 </div>
                                 <div className="col-md-6">
                                     <div className="input-block local-forms">
                                         <label className="focus-label">Grade</label>
                                         <Field type="text" name="grade" className="form-control floating" />
                                         <ErrorMessage name="grade" component="div" className="text-danger" />
                                     </div>
                                 </div>
                             </div>
                             <div className="add-more">
                                 <Link to="#" className="btn btn-primary">
                                     <i className="fa fa-plus" /> Add More Institute
                                 </Link>
                             </div>
                         </div>

                         <div className="card-box">
                             <h3 className="card-title">Experience Informations</h3>
                             <div className="row">
                                 <div className="col-md-6">
                                     <div className="input-block local-forms">
                                         <label className="focus-label">Company Name</label>
                                         <Field type="text" name="company_name" className="form-control floating" />
                                         <ErrorMessage name="company_name" component="div" className="text-danger" />
                                     </div>
                                 </div>
                                 <div className="col-md-6">
                                     <div className="input-block local-forms">
                                         <label className="focus-label">Location</label>
                                         <Field type="text" name="location" className="form-control floating" />
                                         <ErrorMessage name="location" component="div" className="text-danger" />
                                     </div>
                                 </div>
                                 <div className="col-md-6">
                                     <div className="input-block local-forms">
                                         <label className="focus-label">Job Position</label>
                                         <Field type="text" name="position" className="form-control floating" />
                                         <ErrorMessage name="position" component="div" className="text-danger" />
                                     </div>
                                 </div>
                                 <div className="col-md-6">
                                     <div className="input-block local-forms">
                                         <label className="focus-label">Period From</label>
                                         <Field type="text" name="period_from" className="form-control floating datetimepicker" />
                                         <ErrorMessage name="period_from" component="div" className="text-danger" />
                                     </div>
                                 </div>
                                 <div className="col-md-6">
                                     <div className="input-block local-forms">
                                         <label className="focus-label">Period To</label>
                                         <Field type="text" name="period_to" className="form-control floating datetimepicker" />
                                         <ErrorMessage name="period_to" component="div" className="text-danger" />
                                     </div>
                                 </div>
                             </div>
                             <div className="add-more">
                                 <Link to="#" className="btn btn-primary">
                                     <i className="fa fa-plus" /> Add More Experience
                                 </Link>
                             </div>
                         </div> */}

                                <div className="text-center">
                                    <button className="btn btn-primary submit-btn mb-4" type="submit">Save</button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                )}
            </div>
        </div>
    )
}

export default EditProfile