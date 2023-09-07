import config from "@/config/config";
import axios from "axios";
import { getCookie } from "cookies-next";

const getJobType = async () => {
    try {
        const result = await axios.get(`${config.domain}/master/jobType`);
        return result;
    } catch (error) {
        return await error;
    }
}

export default {
    getJobType,
}