import axios from 'axios';

const API_URL = 'https://api.exchangerate-api.com/v4/latest/USD';

export const getUsdPrice = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.rates.TRY; // USD/TRY kuru
    } catch (error) {
        console.error('Dolar kuru alınamadı:', error);
        return null;
    }
};
