import config from "@/config/config";
import axios from "axios";
import { getCookie } from "cookies-next";

const createUserAddress = async (payload: any) => {
    const id = payload.id;
    const data = payload.data
    try {
        const headers = { Authorization: `Bearer ${getCookie('access_token')}`}
        const result = await axios.post(`${config.domain}/users/users/profile/address/${id}`, data, { headers });
        return result;
    } catch (error) {
        return await error;
    }
}

const editUserAddress = async (payload: any) => {
    const userEntityId = payload.userEntityId;
    const id = payload.id;
    const data = payload.data
    try {
        const headers = { Authorization: `Bearer ${getCookie('access_token')}`}
        const result = await axios.put(`${config.domain}/users/users/profile/address?userEntityId=${userEntityId}&id=${id}`, data, { headers });
        return result;
    } catch (error) {
        return await error;
    }
}

const deleteUserAddress = async (payload: any) => {
    const id = payload.id;
    try {
        const headers = { Authorization: `Bearer ${getCookie('access_token')}`}
        const result = await axios.delete(`${config.domain}/users/users/profile/address/${id}`, { headers });
        return result;
    } catch (error) {
        return await error;
    }
}

export default {
    createUserAddress,
    editUserAddress,
    deleteUserAddress,
}