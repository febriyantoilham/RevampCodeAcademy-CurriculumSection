import axios from "axios";
import config from "@/config/config";

const getAllSections = async (payload: any) => {
    const progEntityId = payload;
    try {
        const result = await axios.get(`${config.domain}/program_entity/section/get/${progEntityId}`);
        return result;
    } catch (error) {
        return error;
    }
}

const getSection = async (payload: any) => {
    const sectId = payload;
    try {
        const result = await axios.get(`${config.domain}/program_entity/section/get/one/${sectId}`);
        return result;
    } catch (error) {
        return error;
    }
}

const deleteSection = async (payload: any) => {
    const {sectProgEntityId, sectId} = payload
    try {
        await axios.delete(`${config.domain}/program_entity/section/delete/${sectProgEntityId}/${sectId}`);
        return payload;
    } catch (error) {
        return error;
    }
}

const createSection = async (data: any) => {
    const progEntityId = data.progEntityId;
    const payload = data.payload
    try {
        const result = await axios.post(`${config.domain}/program_entity/section/create/${progEntityId}`, payload);
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
        const result = await axios.put(`${config.domain}/program_entity/section/update/${sectProgEntityId}/${sectId}`, payload);
        return result;
    } catch (error) {
        return error;
    }
}
export default {
    getAllSections,
    getSection,
    deleteSection,
    createSection,
    updateSection,
}