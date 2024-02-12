import apiAxios from "./axios/config";
import {toast} from "react-toastify";

const endpoint = `${process.env.REACT_APP_API}/auth`

export async function register({ email, password }: { email: string, password: string }): Promise<any> {
    try {
        const response = await apiAxios.post(
            `${endpoint}/register`,
            {
                email, password
            },
        );

        if (response.data.message) {
            toast.error(`${response.data.message}`)
        } else if (response.data.success) {
            toast.success(`Logged in successfully`)
        }

        return response.data;
    } catch (err: any) {
        if (err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.message}`)
        }       
        throw Error(`[Error Could not fetch registration services]: ${err}`);
    }
}

export async function login({ email, password }: { email: string, password: string }): Promise<any> {
    try {
        const response = await apiAxios.post(
            `${endpoint}/login`,
            {
                email, password
            },
        );  

        if (response.data.message) {
            toast.error(`${response.data.message}`)
        } else if (response.data.success) {
            toast.success(`Logged in successfully`)
        }

        return response.data;
    } catch (err: any) {   
        if (err.response.data.message) {
            toast.error(`${err.response.data.message}`)
        } else {
            toast.error(`${err.message}`)
        }
        throw Error(`[Error Could not fetch login services]: ${err}`);
    }
}