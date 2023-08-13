import axios from "axios";
import config from "@/config/config";

const createSectionDetail = async (payload: any) => {
    try {
        const result = await axios.post(`${config.domain}/program_entity/subsection/create`, payload);
        return result;
    } catch (error) {
        return error;
    }
}

const getOneSectionDetail = async (payload: any) => {
    try {
        const result = await axios.get(`${config.domain}/program_entity/subsection/get/one/${payload}`);
        return result;
    } catch (error) {
        return error;
    }
}

const getAllSectionDetail = async (payload: any) => {
    try {
        const result = await axios.get(`${config.domain}/program_entity/subsection/get/all/${payload}`);
        return result;
    } catch (error) {
        return error;
    }
}

const deleteOneSectionDetail = async (payload: any) => {
    try {
        await axios.delete(`${config.domain}/program_entity/subsection/delete/one/${payload}`);
        return payload;
    } catch (error) {
        return error;
    }
}


const updateSectionDetail = async (data: any) => {
    const secdId = data.secdId;
    const payload = data.data;
    
    try {
        const result = await axios.put(`${config.domain}/program_entity/subsection/update/${secdId}`, payload);
        return result;
    } catch (error) {
        return error;
    }
}


export default {
    createSectionDetail,
    getOneSectionDetail,
    getAllSectionDetail,
    deleteOneSectionDetail,
    updateSectionDetail,
}