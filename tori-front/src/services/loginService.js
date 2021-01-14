import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000/api";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const login = async (values) => {
  const response = await axios.post(`${baseUrl}/login`, {
    email: values.email,
    password: values.password,
  });
  return response.data;
};

const loginService = {
  login,
};

export default loginService;
