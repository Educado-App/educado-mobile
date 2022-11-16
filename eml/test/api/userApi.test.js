import * as userApi from "../../api/userApi"
import axios from "axios"

jest.mock('axios')

const url = test;

it('Should respond with confirmation that a user was registered', async() => {

    const obj = {
        phone: "123456789",
        password: "password123"
    }

    axios.post.mockResolvedValue({
        message: "(App)User Created Successfully",
        result: {
            _id: "6374b3092057a23daee6d460",
            phone: "123456789",
            password: "$2b$10$wHIRVcKFlXzwRcaSlIRPsOEDpt4S4JooALmLy6a54u0uf6IRKvsuW",
            timeOfLogin: "2022-11-16T09:53:13.062Z",
            __v: 0
        }
    });

    const res = await axios.post(url + "/api/eml/register", obj);
    expect(res).toEqual({
        message: "(App)User Created Successfully",
        result: {
            _id: "6374b3092057a23daee6d460",
            phone: "123456789",
            password: "$2b$10$wHIRVcKFlXzwRcaSlIRPsOEDpt4S4JooALmLy6a54u0uf6IRKvsuW",
            timeOfLogin: "2022-11-16T09:53:13.062Z",
            __v: 0
        }
    })
})