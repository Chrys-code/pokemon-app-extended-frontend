import axios from "axios";
import { toast } from "react-toastify";

const endpoint = `${process.env.REACT_APP_API}/auth`
const appDomain = process.env.REACT_APP_DOMAIN || ''

axios.defaults.withCredentials = true;
axios.defaults.headers.head = {
    "Access-Control-Allow-Origin": appDomain
}

export interface AuthApiResponse {
    user: {
        id: string,
        email: string
    }
}

export async function register({ email, password }: { email: string, password: string }): Promise<AuthApiResponse> {
    try {
        const response = await axios.post(
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
        if (err.response.data.message) toast.error(`${err.response.data.message}`);
        throw Error(`[Error Could not fetch registration services]: ${err}`);
    }
}

export async function login({ email, password }: { email: string, password: string }): Promise<AuthApiResponse> {
    try {
        const response = await axios.post(
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
        if (err.response.data.message) toast.error(`${err.response.data.message}`);
        throw Error(`[Error Could not fetch login services]: ${err}`);
    }
}