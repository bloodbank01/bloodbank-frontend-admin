// src/api/apiService.js
import apiClient from './ApiClient';
import ENDPOINTS from '../endpoints';

const tokens = async () => {
    let token = localStorage.getItem('token')
    return token
}

const errorResponse = (error) => {
    if (error.status == 401) {
        localStorage.removeItem('token')
    }

    return { status: false, message: error.response.data.error.message }
}

const validRespones = async (res) => {
    try {
        console.log('valid response ', res)
        if (res.data?.error) {
            console.log('valid errrrr', res.data?.error?.message)
            return { status: false, message: res.data?.error?.message }
        }

        return { status: true, message: res.data?.success?.message, data: res?.data?.data }
    } catch (error) {
        return { status: false, message: "Response Error!" }
    }
}

export const signUp = async (payload) => {
    try {

        const response = await apiClient.post(ENDPOINTS.signUp, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const signIn = async (payload) => {
    try {

        const response = await apiClient.post(ENDPOINTS.signIn, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const forgotPassword = async (payload) => {
    try {

        const response = await apiClient.post(ENDPOINTS.forgotPassword, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const resetPassword = async (payload) => {
    try {

        const response = await apiClient.post(ENDPOINTS.resetPassword, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const logout = async (payload) => {
    try {

        const response = await apiClient.get(ENDPOINTS.logout, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getProfile = async (payload) => {
    try {

        const response = await apiClient.get(ENDPOINTS.getProfile, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getProfileById = async (id) => {
    try {

        const response = await apiClient.get(`${ENDPOINTS.getProfileById}/${id}`);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};


export const updateAdminProfile = async (payload) => {
    try {

        const response = await apiClient.post(ENDPOINTS.updateAdminProfile, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const updateProfilePic = async (payload) => {
    try {

        const response = await apiClient.post(ENDPOINTS.updateProfilePic, payload, { is_file: true });
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        console.log(error)
        return errorResponse(error)
    }
};

export const addHospital = async (payload) => {
    try {

        const response = await apiClient.post(ENDPOINTS.addHospital, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getHospital = async (payload) => {
    try {

        const response = await apiClient.get(ENDPOINTS.getHospital, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getHospitalById = async (id) => {
    try {

        const response = await apiClient.get(`${ENDPOINTS.getHospitalById}/${id}`);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const updateHospital = async (payload) => {
    try {

        const response = await apiClient.put(ENDPOINTS.updateHospital, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const deleteHospital = async (id) => {
    try {

        const response = await apiClient.delete(`${ENDPOINTS.deleteHospital}/${id}`);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const addDoctor = async (payload) => {
    try {

        const response = await apiClient.post(ENDPOINTS.addDoctor, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getDoctor = async (payload) => {
    try {

        const response = await apiClient.get(ENDPOINTS.getDoctor, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getDoctorById = async (id) => {
    try {

        const response = await apiClient.get(`${ENDPOINTS.getDoctorById}/${id}`);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const updateDoctor = async (payload) => {
    try {

        const response = await apiClient.put(ENDPOINTS.updateDoctor, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const deleteDoctor = async (id) => {
    try {

        const response = await apiClient.delete(`${ENDPOINTS.deleteDoctor}/${id}`);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const addBloodGroup = async (payload) => {
    try {

        const response = await apiClient.post(ENDPOINTS.addBloodGroup, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getBloodGroup = async (payload) => {
    try {

        const response = await apiClient.get(ENDPOINTS.getBloodGroup, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getBloodGroupById = async (id) => {
    try {

        const response = await apiClient.get(`${ENDPOINTS.getBloodGroupById}/${id}`);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const updateBloodGroup = async (payload) => {
    try {

        const response = await apiClient.put(ENDPOINTS.updateBloodGroup, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const deleteBloodGroup = async (id) => {
    try {

        const response = await apiClient.delete(`${ENDPOINTS.deleteBloodGroup}/${id}`);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getContact = async (filter = 'all') => {
    try {

        const response = await apiClient.get(`${ENDPOINTS.getContact}/${filter}`);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getContactById = async (id) => {
    try {

        const response = await apiClient.get(`${ENDPOINTS.getContactById}/${id}`);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const updateContact = async (payload) => {
    try {

        const response = await apiClient.put(ENDPOINTS.updateContact, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getFilterContact = async (payload) => {
    try {

        const response = await apiClient.post(ENDPOINTS.getFilterContact, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const deleteContact = async (id) => {
    try {

        const response = await apiClient.delete(`${ENDPOINTS.getContactById}/${id}`);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getAppointment = async (payload) => {
    try {

        let response = null

        if (payload == 'admin') {
            response = await apiClient.get(ENDPOINTS.getAppointment);
        } else {
            response = await apiClient.get(ENDPOINTS.getHospitalAppointment);
        }

        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const updateAppointment = async (payload) => {
    try {

        const response = await apiClient.put(ENDPOINTS.updateAppointment, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const getHospitalDoctors = async (payload) => {
    try {

        const response = await apiClient.get(ENDPOINTS.getHospitalDoctors, payload);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};

export const deleteAppointment = async (id) => {
    try {

        const response = await apiClient.delete(`${ENDPOINTS.deleteAppointment}/${id}`);
        let res = await validRespones(response)

        if (!res.status) {
            return { status: false, message: res.message }
        }

        return { status: true, message: res.message, data: res.data }

    } catch (error) {
        return errorResponse(error)
    }
};