import axios from "axios";
import { useState } from "react";

export default function useData() {
  const getData = () => {
    const jwtString = sessionStorage.getItem("jwt");
    const userString = sessionStorage.getItem("user_blog");
    const userData = {"jwt":JSON.parse(jwtString), "user": JSON.parse(userString)};
    return userData;
  };

  const [data, setData] = useState(getData());

  const saveData = (userData) => {
    sessionStorage.setItem("jwt", JSON.stringify(userData.jwt));
    sessionStorage.setItem("user_blog", JSON.stringify(userData.user));
    axios.defaults.headers.common = {'Authorization': `Bearer ${userData.jwt}`}
    setData(userData);
  };

  return {
    setData: saveData,
    data,
  };
}
