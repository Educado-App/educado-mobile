import axios from "axios";

const url = 'http://localhost:8888'

export const getCourses = async () => {
    // TODO: add bearer token to request header and omit /public/
    const res = await axios.get(url + '/api/public/courses');
    return res.data;
};

export const getCourse = async (courseId) => {
    const res = await axios.get(url + '/api/public/courses/' + courseId);
    return res.data;
};

//TODO: Endpoint for getcoursebyid && change getCourses to getCourseList

export const getPresignedUrl = async (component_id) => {
    const obj = {
        component_id: component_id
    }
    const res = await axios.post(url + '/api/get-presigned-url', obj);
    return res.data;
};

export const getCoverPhoto = async (course_id) => {
    const obj = {
        course_id: course_id
    }
    // Send request to S3 server
    const res = await axios.post(url + '/api/eml/get-presigned-url', obj);
    return res.data;
}

export const getAllSections = async (sections) => {
    const obj = {
        sections: sections
    }
    // Send request to S3 server
    const res = await axios.post(url + '/api/eml/course/getallsections', obj);

    return res.data;
}

export const getAllComponents = async (components) => {
    const obj = {
        components: components
    };
    // Send request to S3 server
    const res = await axios.post(url + '/api/component/getallcomponents', obj);
    return res.data;
}

