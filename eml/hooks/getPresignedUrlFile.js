import axios from 'axios';

const getPresignedUrl = async(link) => {
  const obj = {
    link: link
  };
  // Send request to S3 server
  const res = await axios.post('http://colibri.somethingnew.dk/api/eml/get-presigned-url-file', obj);
  return res.data;
};

export default getPresignedUrl;