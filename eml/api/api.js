import axios from "axios";

const prod = 'http://educado.somethingnew.dk'
const test = 'https://ancient-basin-06516.herokuapp.com'

export const getCourses = async () => {
    const res = await axios.get('https://ancient-basin-06516.herokuapp.com/api/course/eml/getall');
    return res.data;
};

export const getPresignedUrl = async (component_id) => {
    const obj = {
        component_id: component_id
    }
    const res = await axios.post('https://ancient-basin-06516.herokuapp.com/api/get-presigned-url',obj);
    return res.data;
};

export const getCoverPhoto = async(course_id) => {
    const obj = {
        course_id: course_id
    }
    // Send request to S3 server
    const res = await axios.post('https://ancient-basin-06516.herokuapp.com/api/eml/get-presigned-url', obj);
    return res.data;
}

export const getAllSections = async(sections) => {
    const obj = {
        sections: sections
    }
    // Send request to S3 server
    const res = await axios.post('https://ancient-basin-06516.herokuapp.com/api/eml/course/getallsections', obj);
    
    return res.data;
}

export const getAllComponents = async(components) => {
    const obj = {
        components: components
    };
    // Send request to S3 server
    const res = await axios.post('https://ancient-basin-06516.herokuapp.com/api/component/getallcomponents', obj);
    return res.data;
}

