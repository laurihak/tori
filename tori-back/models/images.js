const { v4: uuidv4 } = require("uuid");
const knex = require("../knex.js");

const getImages = async (product_id) => {
  try {
    return await knex.select().table("images").where("product_id", product_id);
  } catch (e) {
    console.log(e.message);
  }
};
const deleteImages = async (product_id) => {
  try {
    return await knex("images").where("product_id", product_id).del();
  } catch (e) {
    console.log(e.message);
  }
};
const deleteImage = async (image_id) => {
  try {
    return await knex("images").where("id", image_id).del();
  } catch (e) {
    console.log(e.message);
  }
};
const getImage = async (image_id) => {
  try {
    return await knex("images").where("id", image_id).first();
  } catch (e) {
    console.log(e.message);
  }
};

const insertImage = async (image, product_id) => {
  const imageToSend = {...image, product_id: product_id}
  try {
    return await knex("images").insert(imageToSend);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getImage,
  getImages,
  deleteImages,
  deleteImage,
  insertImage,
};
