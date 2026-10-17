// src/apis/apiClient.js
import axios from "axios";

const apiClient = axios.create({
  // .env의 VITE_API_URL(끝에 / 포함) + api/v1
  baseURL: `${import.meta.env.VITE_API_URL}api/v1`,
});

export default apiClient;

//이제 각 요청에서는 apiClient.get("/posts")처럼 뒷부분만 적으면 된다
