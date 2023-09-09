import axios from "axios";
import config from "@/config/config";


const getInstructorList = async () => {
    try {
        const result = await axios.get(`${config.domain}/bootcamp/instructor_programs/instructor_list`);
        return result.data;
    } catch (error) {
        return error;
    }
}

export default { getInstructorList }