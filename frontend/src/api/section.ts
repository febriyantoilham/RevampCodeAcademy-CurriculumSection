import axios from "axios";
import config from "@/config/config";

const getSection = async (payload: any) => {
    try {
        const result = await axios.get(`${config.domain}/curriculum/section/get/${payload}`);
        return result;
    } catch (error) {
        return error;
    }
}

const deleteSection = async (payload: any) => {
    const {sectProgEntityId, sectId} = payload
    try {
        await axios.delete(`${config.domain}/curriculum/section/delete/${sectProgEntityId}/${sectId}`);
        return payload;
    } catch (error) {
        return error;
    }
}

const createSection = async (data: any) => {
    const sectProgEntityId = data.id;
    const payload = data.data
    try {
        console.log(`Id: ${sectProgEntityId}`);
        console.log(`payload: ${JSON.stringify(payload)}`);
        
        const result = await axios.post(`${config.domain}/curriculum/section/create/${sectProgEntityId}`, payload);
        return result;
    } catch (error) {
        return error;
    }
}

const updateSection = async (id: any, payload: any) => {
    try {
        // const { id } = payload;
        const result = await axios.put(`${config.domain}/curriculum/update/${id}`, payload);
        return result;
    } catch (error) {
        return error;
    }
}

const getCategory = async () => {
    try {
        const result = await axios.get(`${config.domain}/curriculum/category`)
        return result;
    } catch (error) {
        return error;
    }
}

export default {
    getSection,
    deleteSection,
    createSection,
    // getCategory,
    // updateSection,
}