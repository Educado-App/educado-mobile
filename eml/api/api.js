import axios from "axios";

export const getCourses = async () => {
    const res = await axios.get('http://educado.somethingnew.dk/api/course/eml/getall');
    return res.data;
};

export const getPresignedUrl = async (component_id) => {
    const obj = {
        component_id: component_id
    }
    const res = await axios.post('http://educado.somethingnew.dk/api/get-presigned-url',);
    return res.data;
};

export const getCoverPhoto = async(course_id) => {
    const obj = {
        course_id: course_id
    }
    // Send request to S3 server
    const res = await axios.post('http://educado.somethingnew.dk/api/eml/get-presigned-url', obj);
    return res.data;
}

export const getAllSections = async(sections) => {
    const obj = {
        sections: sections
    }
    // Send request to S3 server
    console.log('Inside getallsections');
    console.log(sections);
    const res = await axios.post('http://educado.somethingnew.dk/api/eml/course/getallsections', obj);
    console.log('Im out');
    console.log(res);
    return res.data;
}

export const getAllComponents = async(components) => {
    const obj = {
        components: components
    }
    // Send request to S3 server
    const res = await axios.post('http://educado.somethingnew.dk/api/eml/course/getallsections', obj);
    return res.data;
}

