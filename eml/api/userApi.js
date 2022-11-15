import axios from "axios";

const prod = 'http://educado.somethingnew.dk'
const testOld = 'https://ancient-basin-06516.herokuapp.com'
const test = 'http://172.20.10.8:8888' //Change this to your LOCAL IP address when testing.
const local = 'http://localhost:8888'

const url = test;

export const registerUser = async(obj) => {

    const res = await axios.post(url + "/api/eml/register", obj);
    return res.data;

}

export const loginUser = async(obj) => {

    const res = await axios.post(url + "/api/eml/login", obj);
    return res.data;

}

export const deleteUser = async(id) => {
    const res = await axios.delete(url + "/api/eml/delete/" + id);
    return res.data;

}

