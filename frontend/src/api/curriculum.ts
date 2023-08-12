import axios from "axios";
import config from "@/config/config";

const getCurriculum = async (payload: any) => {
    try {
        const { page = 1, limit = 10} = payload;
        const result = await axios.get(`${config.domain}/program_entity/paging?page=${page}&limit=${limit}`);

        return result;
    } catch (error) {
        return error;
    }
}

const searchCurriculum = async (payload: any) => {
    try {
        const {page = 1, limit = 10, name = '', status = ''} = payload
        const result = await axios.get(`${config.domain}/program_entity/search?page=${page}&limit=${limit}&name=${name}&status=${status}`);
        return result;
    } catch (error) {
        return error;
    }
}

const findOneCurriculum = async (payload: any) => {
    try {
        const result = await axios.get(`${config.domain}/program_entity/view/proentityid/${payload}`);
        return result;
    } catch (error) {
        return error;
    }
}

const createCurriculum = async (payload: any) => {
    try {
        const result = await axios.post(`${config.domain}/program_entity/create`, payload);
        return result;
    } catch (error) {
        return error;
    }
}

const getNewProgEntityId = async () => {
    try {
        const result = await axios.get(`${config.domain}/program_entity/getNewProgEntityId`);
        return result;
    } catch (error) {
        return error;
    }
}

const deleteCurriculum = async (payload: any) => {
    try {
        await axios.delete(`${config.domain}/program_entity/delete/${payload}`);
        return payload;
    } catch (error) {
        return error;
    }
}

const deleteBundleCurriculum = async (payload: any) => {
    try {
        console.log(`Payload: ${JSON.stringify(payload)}`);
        await axios.delete(`${config.domain}/program_entity/delete_bundle`, { data: payload });
        return payload;
    } catch (error) {
        return error;
    }
}

const updateCurriculum = async (data: any,) => {
    const id = data.id;
    const payload = data.data
    try {
        console.log(`Payload: ${JSON.stringify(payload)}`);
        console.log(`id: ${id}`);
        
        const result = await axios.put(`${config.domain}/program_entity/update/${id}`, payload);
        return result;
    } catch (error) {
        return error;
    }
}

const getCategory = async () => {
    try {
        const result = await axios.get(`${config.domain}/program_entity/cat`)
        return result;
    } catch (error) {
        return error;
    }
}

const getImageDefault = async (payload: any) => {
    try {
        const result = await axios.get(`${config.domain}/program_entity/getLogo/${payload}`)
        return result;
    } catch (error) {
        return error;
    }
}

export default {
    getCurriculum,
    searchCurriculum,
    findOneCurriculum,
    deleteCurriculum,
    deleteBundleCurriculum,
    createCurriculum,
    getNewProgEntityId,
    getCategory,
    updateCurriculum,
    getImageDefault,
}