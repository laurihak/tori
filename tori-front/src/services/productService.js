import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000/api"
let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getPages = async (searchWord, location) => {
  const config = {
    params: { searchWord: searchWord, location: location },
  };
  const response = await axios.get(
    `${baseUrl}/products/pages`,
    config
  );
  return response.data;
};
const getAll = async (searchWord, location, page) => {
  console.log('baseurl now: ', baseUrl)
  console.log("searchword now", searchWord);
  const config = {
    params: { searchWord: searchWord, location: location, page: page },
  };
  const response = await axios.get(`${baseUrl}/products`, config);
  return response.data;
};

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/products/${id}`);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(`${baseUrl}/products`, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl} /${id}`, newObject, config);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl} /${id}`, config);
  return response.data;
};

const getImages = async (id) => {
  const response = await axios.get(`${baseUrl}/products/${id}/images`);
  return response.data;
};

const insertImage = async (id, file) => {
  console.log("file here", file);
  const config = {
    headers: { Authorization: token, "content-type": "multipart/form-data" },
  };
  const formData = new FormData();
  formData.append("avatar", file);
  const response = await axios.post(
    `${baseUrl}/products/${id}/images`,
    formData,
    config
  );
  return response.data;
};

const productService = {
  getAll,
  getById,
  create,
  update,
  remove,
  setToken,
  getImages,
  getPages,
  insertImage,
};

export default productService;
