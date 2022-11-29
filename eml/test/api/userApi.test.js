import * as userApi from "../../api/userApi";
import axios from "axios";

jest.resetAllMocks()
jest.mock('axios')

describe('registerUser', () => {
    it('Should respond with confirmation that a user was registered', async() => {

        const obj = {
            phone: "123456789",
            password: "password123"
        }
    
        axios.post.mockResolvedValue({data: {
            message: "(App)User Created Successfully",
            result: {
                _id: "6374b3092057a23daee6d460",
                phone: "123456789",
                password: "$2b$10$wHIRVcKFlXzwRcaSlIRPsOEDpt4S4JooALmLy6a54u0uf6IRKvsuW",
                timeOfLogin: "2022-11-16T09:53:13.062Z",
                __v: 0
            }
        }});
    
        const res = await userApi.registerUser(obj);
        expect(res).toEqual({
            message: "(App)User Created Successfully",
            result: {
                _id: "6374b3092057a23daee6d460",
                phone: "123456789",
                password: "$2b$10$wHIRVcKFlXzwRcaSlIRPsOEDpt4S4JooALmLy6a54u0uf6IRKvsuW",
                timeOfLogin: "2022-11-16T09:53:13.062Z",
                __v: 0
            }
        });
    })
})

jest.resetAllMocks()
jest.mock('axios')

describe('loginUser', () => {
    it('Should respond with confirmation that user was logged in successfully', async() => {

        obj = {
            phone: "123456789",
            password: "password123"
        }

        axios.post.mockResolvedValue({data: {
            message: "Login Successful",
            phone: "123456789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBVc2VySWQiOiI2Mzc0YjMwOTIwNTdhMjNkYWVlNmQ0NjAiLCJhcHBVc2VycGhvbmUiOiIxMjM0NTY3ODkiLCJpYXQiOjE2Njg1OTM0Nzd9.E0xSoj6ohIfAP8IjicEKaep6IhvjSp2Y8fWwelOG774"
        }});

        const res = await userApi.loginUser(obj);
        expect(res).toEqual({
            message: "Login Successful",
            phone: "123456789",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBVc2VySWQiOiI2Mzc0YjMwOTIwNTdhMjNkYWVlNmQ0NjAiLCJhcHBVc2VycGhvbmUiOiIxMjM0NTY3ODkiLCJpYXQiOjE2Njg1OTM0Nzd9.E0xSoj6ohIfAP8IjicEKaep6IhvjSp2Y8fWwelOG774"
        });
    })
})

jest.resetAllMocks()
jest.mock('axios')

describe('deleteUser', () => {
    it('Should respond with confirmation that a user was deleted', async() => {

        axios.delete.mockResolvedValue({
            data:"User deleted successfully"});

        const res = await userApi.deleteUser()
        expect(res).toEqual("User deleted successfully")
    })
})