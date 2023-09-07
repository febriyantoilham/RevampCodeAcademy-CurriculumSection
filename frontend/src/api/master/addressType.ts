import config from "@/config/config";
import axios from "axios";
import { getCookie } from "cookies-next";

const getAddressType = async () => {
    try {
        const result = await axios.get(`${config.domain}/master/addressType`);
        return result;
    } catch (error) {
        return await error;
    }
}

export default {
    getAddressType,
}