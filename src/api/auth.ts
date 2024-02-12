import apiAxios from "./axios/config";

const endpoint = `${process.env.REACT_APP_API}/auth`

export async function register({ email, password }: { email: string, password: string }): Promise<any> {
    try {
        const response = await apiAxios.post(
            `${endpoint}/register`,
            {
                email, password
            },
        );
        return response.data;
    } catch (err: any) {
        console.log(err)
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
        return response.data;
    } catch (err: any) {
        console.log(err)
        throw Error(`[Error Could not fetch login services]: ${err}`);
    }
}