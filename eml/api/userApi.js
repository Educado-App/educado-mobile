import axios from "axios";

const prod = 'http://educado.somethingnew.dk'
const testOld = 'https://ancient-basin-06516.herokuapp.com'
const test = 'http://localhost:8888'
const local = 'http://192.168.43.130'

const url = local;

export const registerUser = async (obj) => {
    const res = await axios.post(url + "/api/eml/register", obj);
    return res.data;
}
