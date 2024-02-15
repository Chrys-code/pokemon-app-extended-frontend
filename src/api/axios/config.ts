import axios, { Axios } from "axios";
import Cookies from 'universal-cookie';

class AxiosClient {

    api: Axios;

    constructor() {
        this.api = axios.create({
            withCredentials: true,
            headers: {
                "Access-Control-Allow-Origin": process.env.REACT_APP_DOMAIN
            }
        });

        this.api.interceptors.request.use(
            async (req) => {
                const cookies = new Cookies();
                req.headers['Authorization'] = cookies.get('Authorization');
                return req;
            },
            (error) => {
                return Promise.reject(error);
            },
        );
    }
}

const axiosCli = new AxiosClient();
export default axiosCli;