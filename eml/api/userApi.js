import axios from "axios";

const prod = 'http://educado.somethingnew.dk'
const testOld = 'https://ancient-basin-06516.herokuapp.com'
const test = 'http://192.168.43.130:8888'
const local = 'exp://192.168.43.130:19000'

const url = test;

export const registerUser = async(obj) => {
    console.log(obj);
    const res = await axios.post(url + "/api/eml/register", obj)
                           .then(function(response){console.log(response)})
                           .catch(function(error){console.log(error)});
    return res.data;
}
