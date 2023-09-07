import config from "@/config/config";
import axios from "axios";
import { getCookie } from "cookies-next";

const createUserPhones = async (payload: any) => {
    const id = payload.id;
    const data = payload.data
    try {
        const headers = { Authorization: `Bearer ${getCookie('access_token')}`}
        const result = await axios.post(`${config.domain}/users/users/profile/phone/${id}`, data, { headers });
        return result;
    } catch (error) {
        return await error;
    }
}

const editUserPhones = async (payload: any) => {
    const userEntityId = payload.userEntityId;
    const id = payload.id;
    const data = payload.data
    try {
        const headers = { Authorization: `Bearer ${getCookie('access_token')}`}
        const result = await axios.put(`${config.domain}/users/users/profile/phone?userEntityId=${userEntityId}&id=${id}`, data, { headers });
        return result;
    } catch (error) {
        return await error;
    }
}

const deleteUserPhones = async (payload: any) => {
    const userEntityId = payload.userEntityId;
    const id = payload.id;
    try {
        console.log(`Api Payload: ${JSON.stringify(payload)}`);
        
        const headers = { Authorization: `Bearer ${getCookie('access_token')}`}
        const result = await axios.delete(`${config.domain}/users/users/profile/phone?userEntityId=${userEntityId}&id=${id}`, { headers });
        return result;
    } catch (error) {
        return await error;
    }
}

export default {
    createUserPhones,
    editUserPhones,
    deleteUserPhones,
}