import axios from "axios";
const token = import.meta.env.VITE_COINGECKO_API_KEY;


export const getCryptoPrices = async (list) => {
    try {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': token }
        };
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${list}&vs_currencies=usd`, options);
        return response.data;

    } catch (error) {
        return error;
    }
}