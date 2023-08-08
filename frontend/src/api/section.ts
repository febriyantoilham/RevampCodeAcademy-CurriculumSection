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
        const result = await axios.post(`${config.domain}/curriculum/section/create/${sectProgEntityId}`, payload);
        return result;
    } catch (error) {
        return error;
    }
}

const updateSection = async (data: any) => {
    const sectId = data.sectId;
    const sectProgEntityId = data.progEntityId;
    const payload = data.data;
    
    try {
        const result = await axios.put(`${config.domain}/curriculum/section/update/${sectProgEntityId}/${sectId}`, payload);
        return result;
    } catch (error) {
        return error;
    }
}
export default {
    getSection,
    deleteSection,
    createSection,
    updateSection,
}