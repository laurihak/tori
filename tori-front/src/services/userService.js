import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000/api";
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const createUser = async (user) => {
  try {
    const response = await axios.post(`${baseUrl}/users`, user);
    return response.data;
  } catch (e) {
    console.log(e.message);
  }
};

const userService = {
  createUser,
};

export default userService;
