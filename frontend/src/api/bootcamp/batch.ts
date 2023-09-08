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

const bulkDelete = async (payload: any) => {
    try {
        const result = await axios.delete(`${config.domain}/bootcamp/batch/bulk_delete`, { data: payload })
        return result;
    } catch (error) {
        return error;
    }
}

export default { getStatusList, getBatch, bulkDelete }