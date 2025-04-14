import axios from "axios";

export const BASE_API_URL = "http://localhost:5000"

export const apiCall = axios.create({
    baseURL: BASE_API_URL,
})