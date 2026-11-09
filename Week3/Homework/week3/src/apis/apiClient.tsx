import axios from "axios";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    params: {
        api_key: import.meta.env.VITE_API_KEY,
        language: 'ko-KR', // 이게 있어야 한국어로 결과가 나온다. 
    },

});

export default apiClient;