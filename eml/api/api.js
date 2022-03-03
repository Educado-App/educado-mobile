import axios from "axios";

export const getCourses = async () => {
    const res = await axios.get('http://colibri.somethingnew.dk/api/course/eml/getall');
    return res.data;
};

export const getPresignedUrl = async (component_id) => {
    const obj = {
        component_id: component_id
    }
    const res = await axios.post('http://colibri.somethingnew.dk/api/get-presigned-url',);
    return res.data;
};

export const getCoverPhoto = async(course_id) => {
    const obj = {
        course_id: course_id
    }
    // Send request to S3 server
    const res = await axios.post('http://colibri.somethingnew.dk/api/eml/get-presigned-url', obj);
    return res.data;
}

export const getAllSections = async(sections) => {
    const obj = {
        sections: sections
    }
    // Send request to S3 server
    const res = await axios.post('http://colibri.somethingnew.dk/api/course/getallsections', obj);
    return res.data;
}

export const getAllComponents = async() => {
    const obj = {
        sections: sections
    }
    // Send request to S3 server
    const res = await axios.post('http://colibri.somethingnew.dk/api/course/getallsections', obj);
    return res.data;
}

