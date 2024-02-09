import axios from "axios";

export async function register({ email, password }: { email: string, password: string }): Promise<any> {
    try {
        const response = await axios.post(
            'http://localhost:3001/user/register',
            {
                email, password
            },
        );
        return response.data;
    } catch (err: any) {
        console.log(err)
        throw Error(`[Error Could not fetch services]: ${err}`);
    }
}

export async function login({ email, password }: { email: string, password: string }): Promise<any> {
    try {
        const response = await axios.post(
            'http://localhost:3001/user/login',
            {
                email, password
            },
        );
        return response.data;
    } catch (err: any) {
        console.log(err)
        throw Error(`[Error Could not fetch services]: ${err}`);
    }
}