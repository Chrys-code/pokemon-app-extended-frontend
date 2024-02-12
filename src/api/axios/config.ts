import axios from "axios";
import Cookies from 'universal-cookie';

const apiAxios = axios.create({
    withCredentials: true,
    headers: {
        "Access-Control-Allow-Origin": process.env.REACT_APP_DOMAIN
    }
});

apiAxios.interceptors.request.use(
    async (req) => {
        const cookies = new Cookies();
        req.headers['Authorization'] = cookies.get('Authorization');
        return req;
    },
    (error) => {
        return Promise.reject(error);
    },
);


export default apiAxios