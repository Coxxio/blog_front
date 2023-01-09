import axios from "axios";

export const LoginService = async (credentials) => {
  return await axios.post("/admin/login", credentials);
};
