import axios from "axios";

const jwtString = sessionStorage.getItem("jwt");
const jwt = JSON.parse(jwtString);
if (jwt) {
  console.log(jwt);
  axios.defaults.headers.common = { Authorization: `Bearer ${jwt}` };
}
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
