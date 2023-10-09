import axios from 'axios';


export const fetchData = async <T>(endpoint: string): Promise<T> => {
    try {
        const response = await axios.get(`${process.env.API_BASE_URL}/api${endpoint}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Error fetching data');
    }
};
