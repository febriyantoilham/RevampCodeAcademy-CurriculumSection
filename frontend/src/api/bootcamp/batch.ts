import axios from "axios";
import config from "@/config/config";


const getStatusList = async () => {
    try {
        const result = await axios.get(`${config.domain}/bootcamp/batch/status_list`);
        return result.data;
    } catch (error) {
        return error;
    }
}

const getProgramList = async () => {
    try {
        const result = await axios.get(`${config.domain}/bootcamp/batch/program_list`);
        return result.data;
    } catch (error) {
        return error;
    }
}

const getCandidateList = async () => {
    try {
        const result = await axios.get(`${config.domain}/bootcamp/batch/candidate_list`);
        return result.data;
    } catch (error) {
        return error;
    }
}

const getBatch = async (payload: any) => {
    try {
        const { page = 1, limit = 10, searchValue = '', status = '' } = payload
        console.log(searchValue);
        
        const result = await axios.get(`${config.domain}/bootcamp/batch/paging?page=${page}&limit=${limit}&searchValue=${searchValue}&status=${status}`);
        
        return result.data;
    } catch (error) {
        return error;
    }
}

const getBatchById = async (payload: any) => {
    const param = payload;
    try {
        const result = await axios.get(`${config.domain}/bootcamp/batch/${param}`);
        
        return result.data;
    } catch (error) {
        return error;
    }
}

const bulkDelete = async (payload: any) => {
    try {
        const result = await axios.delete(`${config.domain}/bootcamp/batch/bulk_delete`, { data: payload })
        return result;
    } catch (error) {
        return error;
    }
}

const createBatch = async (payload: any) => {
    try {
        const result = await axios.post(`${config.domain}/bootcamp/batch/create`, payload)
        return result
    } catch (error) {
        return error;
    }
}

const editBatch = async (payload: any) => {
    const {progEntityId, id, data} = payload;
    try {
        const result = await axios.put(`${config.domain}/bootcamp/batch/edit?progEntityId=${progEntityId}&id=${id}`, data)
        return result.data;
    } catch (error) {
        return error;
    }
}

const closeBatch = async (payload: any) => {
    const {progEntityId, id} = payload;
    try {
        const result = await axios.put(`${config.domain}/bootcamp/batch/close_batch?progEntityId=${progEntityId}&id=${id}`)
        return result
    } catch (error) {
        return error;
    }
}

const setRunning = async (payload: any) => {
    const {progEntityId, id} = payload;
    try {
        const result = await axios.put(`${config.domain}/bootcamp/batch/set_running?progEntityId=${progEntityId}&id=${id}`)
        return result
    } catch (error) {
        return error;
    }
}

export default { getStatusList, getProgramList, getCandidateList, getBatch, getBatchById, bulkDelete, createBatch, editBatch, closeBatch, setRunning }