import axios from "axios";
import config from "@/config/config";

const getPrograms = async (payload: any) => {
    try {
        // console.log(`Search Value: ${payload.searchValue}`);
        const {page = 1, limit = 10, searchValue = '', status = ''} = payload
        const result = await axios.get(`${config.domain}/program_entity/search?page=${page}&limit=${limit}&searchValue=${searchValue}&status=${status}`);
        return result;
    } catch (error) {
        return error;
    }
}

const getProgramById = async (payload: any) => {
    try {
        const result = await axios.get(`${config.domain}/program_entity/view/proentityid/${payload}`);
        return result;
    } catch (error) {
        return error;
    }
}

const createProgram = async (payload: any) => {
    try {
        const result = await axios.post(`${config.domain}/program_entity/create`, payload);
        return result;
    } catch (error) {
        return error;
    }
}

const createProgEntityId = async () => {
    try {
        const result = await axios.get(`${config.domain}/program_entity/getNewProgEntityId`);
        return result;
    } catch (error) {
        return error;
    }
}

const deleteProgram = async (payload: any) => {
    try {
        await axios.delete(`${config.domain}/program_entity/delete/${payload}`);
        return payload;
    } catch (error) {
        return error;
    }
}

const bulkDeleteProgram = async (payload: any) => {
    try {
        // console.log(`Payload: ${JSON.stringify(payload)}`);
        const result = await axios.delete(`${config.domain}/program_entity/bulk_delete`, { data: payload });
        return result.data;
    } catch (error) {
        return error;
    }
}

const updateProgram = async (data: any,) => {
    const id = data.id;
    const payload = data.data
    try {
        // console.log(`Payload: ${JSON.stringify(payload)}`);
        // console.log(`id: ${id}`);
        
        const result = await axios.put(`${config.domain}/program_entity/update/${id}`, payload);
        return result;
    } catch (error) {
        return error;
    }
}

const getCatAndEmp = async () => {
    try {
        const result = await axios.get(`${config.domain}/program_entity/cat&emp`)
        return result;
    } catch (error) {
        return error;
    }
}

const getImageDefault = async (payload: any) => {
    try {
        const result = await axios.get(`${config.domain}/program_entity/getImg/${payload}`)
        return result;
    } catch (error) {
        return error;
    }
}

export default {
    getPrograms,
    getProgramById,
    deleteProgram,
    bulkDeleteProgram,
    createProgram,
    createProgEntityId,
    getCatAndEmp,
    updateProgram,
    getImageDefault,
}