import axios from 'axios';

const getPresignedUrl = async(course_id) => {
    const obj = {
        course_id: course_id
    }
    // Send request to S3 server
    const res = await axios.post('http://colibri.somethingnew.dk/api/eml/get-presigned-url', obj);
    return res.data;
}

export default getPresignedUrl;