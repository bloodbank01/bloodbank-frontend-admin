import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router';
import { useAlert } from '../../Common/Toasts/AlertProvider';
import { useSuccess } from '../../Common/Toasts/SuccessProvider';
import { useLoader } from '../../Common/Loader/useLoader';
import { addHospital, getHospitalById, updateHospital } from '../../Common/Apis/ApiService';
import { useParams } from 'react-router-dom';

const EditHospital = () => {

    const navigate = useNavigate()

    const { alert } = useAlert()
    const { success } = useSuccess()
    const { startLoading, stopLoading } = useLoader();
    const [data, setData] = useState(null)
    const params = useParams();
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

    const validationSchema = Yup.object({
        hospital_name: Yup.string().required('Hospital Name is required'),
        hospital_type: Yup.string().required('Hospital Type is required'),
        website: Yup.string().url().required('Website is required'),
        contact_no: Yup.string().required('Contact No is required'),
        alt_contact_no: Yup.string().required('Alternate Contact No is required'),
        description: Yup.string().required('Description is required'),
        address: Yup.string().required('Address is required'),
        country: Yup.string().required('Country is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        pincode: Yup.string().required('Postal Code is required'),
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
            const response = await getHospitalById(id)
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
            const response = await updateHospital({ ...data, id })
            stopLoading()
            if (response.status) {
                success(response.message)
                navigate('/admin/hospital/list')
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
        hospital_name: data?.name ?? '',
        hospital_type: data?.type ?? '',
        website: data?.website ?? '',
        contact_no: data?.contact_no ?? '',
        alt_contact_no: data?.alternat_no ?? '',
        description: data?.description ?? '',
        address: data?.address?.address ?? '',
        country: data?.address?.country ?? '',
        state: data?.address?.state ?? '',
        city: data?.address?.city ?? '',
        pincode: data?.address?.pincode ?? '',
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
                                        <Link to="/admin/hospital/list">Hospitals </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <i className="feather-chevron-right" />
                                    </li>
                                    <li className="breadcrumb-item active">Add Hospital</li>
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
                                                        <div className="form-heading"><h4>Hospital Details</h4></div>
                                                    </div>

                                                    <div className="col-12 col-md-6 col-xl-4">
                                                        <div className="input-block local-forms">
                                                            <label>Hospital Name <span className="login-danger">*</span></label>
                                                            <Field className="form-control" name="hospital_name" type="text" />
                                                            <ErrorMessage name="hospital_name" component="div" className="text-danger" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6 col-xl-4">
                                                        <div className="input-block local-forms">
                                                            <label>Hospital Type <span className="login-danger">*</span></label>
                                                            <Field as="select" className="form-control select" name="hospital_type">
                                                                <option value="">Select Hospital Type</option>
                                                                <option value="Government">Government</option>
                                                                <option value="Private">Private</option>
                                                            </Field>
                                                            <ErrorMessage name="hospital_type" component="div" className="text-danger" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6 col-xl-4">
                                                        <div className="input-block local-forms">
                                                            <label>Website <span className="login-danger">*</span></label>
                                                            <Field className="form-control" name="website" type="text" />
                                                            <ErrorMessage name="website" component="div" className="text-danger" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6 col-xl-6">
                                                        <div className="input-block local-forms">
                                                            <label>Contact No <span className="login-danger">*</span></label>
                                                            <Field className="form-control" name="contact_no" type="text" />
                                                            <ErrorMessage name="contact_no" component="div" className="text-danger" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6 col-xl-6">
                                                        <div className="input-block local-forms">
                                                            <label>Alternat Contact No <span className="login-danger">*</span></label>
                                                            <Field className="form-control" name="alt_contact_no" type="text" />
                                                            <ErrorMessage name="alt_contact_no" component="div" className="text-danger" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-sm-12">
                                                        <div className="input-block local-forms">
                                                            <label>Description <span className="login-danger">*</span></label>
                                                            <Field as="textarea" className="form-control" name="description" rows="3" cols="30" />
                                                            <ErrorMessage name="description" component="div" className="text-danger" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-sm-12">
                                                        <div className="input-block local-forms">
                                                            <label>Address <span className="login-danger">*</span></label>
                                                            <Field as="textarea" className="form-control" name="address" rows="3" cols="30" />
                                                            <ErrorMessage name="address" component="div" className="text-danger" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12 col-md-6 col-xl-3">
                                                        <div className="input-block local-forms">
                                                            <label>Country <span className="login-danger">*</span></label>
                                                            <Field as="select" className="form-control select" name="country">
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
                                                            <Field as="select" className="form-control select" name="state">
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
                                                            <Field as="select" className="form-control select" name="city">
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
                                                            <Field className="form-control" name="pincode" type="text" />
                                                            <ErrorMessage name="pincode" component="div" className="text-danger" />
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <div className="doctor-submit text-end">
                                                            <button type="submit" className="btn btn-primary submit-form me-2">Submit</button>
                                                            <button onClick={() => navigate('/admin/hospital/list')} type="reset" className="btn btn-primary cancel-form">Cancel</button>
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

export default EditHospital