
const URL = {
    // API 
    baseUrl: 'http://localhost:4062/admin/'
    // baseUrl : 'https://bloodbank-backend-e8cg.onrender.com/admin'
    // baseUrl : import.meta.env.VITE_BASE_URL
}
const ENDPOINTS = {
    // API Endpoints
    baseUrl: URL.baseUrl,
    signIn: URL.baseUrl + 'api/auth/sign-in',
    logout: URL.baseUrl + 'api/auth/logout',
    forgotPassword: URL.baseUrl + 'api/auth/forgot-password',
    resetPassword: URL.baseUrl + 'api/auth/reset-password',
    updateAdminProfile: URL.baseUrl + 'api/profile/update-admin-profile',
    updateProfilePic: URL.baseUrl + 'api/profile/update-profile-pic',
    getProfile: URL.baseUrl + 'api/profile',
    getProfileById: URL.baseUrl + 'api/profile',
    addHospital: URL.baseUrl + 'api/hospital',
    getHospital: URL.baseUrl + 'api/hospital',
    getHospitalById: URL.baseUrl + 'api/hospital',
    updateHospital: URL.baseUrl + 'api/hospital',
    deleteHospital: URL.baseUrl + 'api/hospital',
    addDoctor: URL.baseUrl + 'api/doctor',
    getDoctor: URL.baseUrl + 'api/doctor',
    getDoctorById: URL.baseUrl + 'api/doctor',
    updateDoctor: URL.baseUrl + 'api/doctor',
    deleteDoctor: URL.baseUrl + 'api/doctor',
    addBloodGroup: URL.baseUrl + 'api/blood-group',
    getBloodGroup: URL.baseUrl + 'api/blood-group',
    getBloodGroupById: URL.baseUrl + 'api/blood-group',
    updateBloodGroup: URL.baseUrl + 'api/blood-group',
    deleteBloodGroup: URL.baseUrl + 'api/blood-group',
    getContact: URL.baseUrl + 'api/contact',
    getFilterContact: URL.baseUrl + 'api/contact/filter',
    getContactById: URL.baseUrl + 'api/contact',
    updateContact: URL.baseUrl + 'api/contact',
    deleteContact: URL.baseUrl + 'api/contact',
    getAppointment: URL.baseUrl + 'api/appointment',
    deleteAppointment: URL.baseUrl + 'api/appointment',
    getHospitalAppointment: URL.baseUrl + 'api/appointment/hospital',
    updateAppointment: URL.baseUrl + 'api/appointment',
    getHospitalDoctors: URL.baseUrl + 'api/appointment/hospital/doctor',
}

export default ENDPOINTS