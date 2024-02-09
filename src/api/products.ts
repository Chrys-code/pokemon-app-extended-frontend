import axios from "axios";

export async function getProducts(): Promise<any> {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        return response.data[0].title;
    } catch (err: any) {
        console.log(err)
        throw Error(`[Error Could not fetch product]: ${err}`);
    }
}

export async function getProductsWithOptions(id: string): Promise<any> {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`);
        return response.data[0].title;
    } catch (err: any) {
        console.log(err)
        throw Error(`[Error Could not fetch product]: ${err}`);
    }
}