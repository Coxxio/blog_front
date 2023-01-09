import axios from "axios";

console.log(process.env.REACT_APP_API_BASE_URL)
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
