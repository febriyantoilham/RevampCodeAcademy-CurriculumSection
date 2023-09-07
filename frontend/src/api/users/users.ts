import config from "@/config/config";
import axios from "axios";
import { getCookie } from "cookies-next";

const userSignin = async (payload: any) => {
    try {
        console.log(`Api Payload: ${JSON.stringify(payload)}`);
        
        const result = await axios.post(`${config.domain}/users/users/signin`, payload);
        return result;
    } catch (error) {
        return await error;
    }
}

const userSignUp = async (payload: any) => {
    try {
        console.log(`Api Payload: ${JSON.stringify(payload)}`);
        
        const result = await axios.post(`${config.domain}/users/users/`, payload);
        return result;
    } catch (error) {
        return await error;
    }
}

const getUserById = async (payload: any) => {
    try {
        const headers = {
            Authorization: `Bearer ${getCookie('access_token')}`,
        }
        const result = await axios.get(`${config.domain}/users/users/profile/view/${payload}`, { headers });
        return result.data;
    } catch (error) {
        return await error;
    }
}

const updateUsers = async (payload: any) => {
    const id = payload.id;
    const data = payload.data
    try {
        const headers = { Authorization: `Bearer ${getCookie('access_token')}`}
        await axios.put(`${config.domain}/users/users/profile/edit/${id}`, data, { headers });
        const result = await axios.get(`${config.domain}/users/users/profile/view/${id}`, { headers });
        return result.data;
    } catch (error) {
        return await error;
    }
}

const updateUserPhoto = async (payload: any) => {
    const id = payload.id;
    const data = payload.data
    try {
        const headers = { Authorization: `Bearer ${getCookie('access_token')}`}
        const result = await axios.put(`${config.domain}/users/users/profile/photo/edit/${id}`, data, { headers });
        return result.data;
    } catch (error) {
        return await error;
    }
}

const updatePassword = async (payload: any) => {
    const id = payload.id;
    const data = payload.data
    try {
        const headers = { Authorization: `Bearer ${getCookie('access_token')}`}
        const result = await axios.put(`${config.domain}/users/users/profile/password/${id}`, data, { headers });
        // await axios.get(`${config.domain}/users/users/profile/view/${id}`, { headers });
        return result.data;
    } catch (error) {
        return await error;
    }
}

export default {
    userSignin,
    userSignUp,
    getUserById,
    updateUsers,
    updateUserPhoto,
    updatePassword,
}