import axios from "axios";

export const getCourses = async () => {
    const res = await axios.get('http://colibri.somethingnew.dk/api/course/eml/getall');
    return res.data;
};