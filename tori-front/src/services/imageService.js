import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

const getImagesWithProductId = async (id) => {
  const response = await axios.get(`${baseUrl}/products/${id}/images`);
  return response.data;
};

const imageService = {
  getImagesWithProductId,
};

export default imageService;
