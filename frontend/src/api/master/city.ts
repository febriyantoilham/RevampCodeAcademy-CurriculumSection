import config from "@/config/config";
import axios from "axios";

const getCity = async () => {
    try {
        const result = await axios.get(`${config.domain}/master/city`);
        return result;
    } catch (error) {
        return await error;
    }
}

export default {
    getCity,
}