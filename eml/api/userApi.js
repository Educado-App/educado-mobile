import axios from "axios";

const prod = 'http://educado.somethingnew.dk'
const testOld = 'https://ancient-basin-06516.herokuapp.com'
const test = 'http://localhost:8888'
const local = 'http://130.225.198.133'

const url = local;

export const registerUser = async () => {
    const obj = {
        phone: "12345678",
        password: "1234"
    }
    const res = await axios.post(url + "/api/eml/register", obj);
    return res.data;
}