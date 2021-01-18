const knex = require("../knex.js");

const insertProduct = async (product) => {
  try {
    return await knex("products").insert(product);
  } catch (e) {
    console.log(e.message);
  }
};

const getTotalPages = async () => {
  try {
    return await knex.count("*").table("products").first();
  } catch (e) {
    console.log(e.message);
  }
};

const getTotalPagesWithFilters = async (searchWord, location) => {
  if (
    searchWord &&
    searchWord.length > 1 &&
    location &&
    location !== "kaikki"
  ) {
    try {
      const response = await knex
        .count("*")
        .table("products")
        .first()
        .where(knex.raw(`LOWER("description") like  ?`, `%${searchWord}%`))
        .andWhere(knex.raw(`LOWER("location") =  ?`, location))
        .orWhere(knex.raw(`LOWER("product_name") like  ?`, `%${searchWord}%`))
        .andWhere(knex.raw(`LOWER("location") =  ?`, location));
      return response;
    } catch (e) {
      console.log(e.message);
    }
  } else if ((searchWord && !location) || location === "kaikki") {
    try {
      const response = await knex
        .count("*")
        .table("products")
        .first()
        .where(knex.raw(`LOWER("description") like  ?`, `%${searchWord}%`))
        .orWhere(knex.raw(`LOWER("product_name") like  ?`, `%${searchWord}%`));
      return response;
    } catch (e) {
      console.log(e.message);
    }
  } else if (!searchWord && location && location !== "kaikki") {
    try {
      const response = await knex
        .count("*")
        .table("products")
        .first()
        .where(knex.raw(`LOWER("location") =  ?`, location));
      return response;
    } catch (e) {
      console.log(e.message);
    }
  } else {
    return await getTotalPages();
  }
};

const getProductsWithFilters = async (searchWord, location, page) => {
  let pageToSend = 1;
  if (page) pageToSend = page;
  const perPage = 20;
  const offset = (pageToSend - 1) * perPage;
  if (
    searchWord &&
    searchWord.length > 1 &&
    location &&
    location !== "kaikki"
  ) {
    try {
      const response = await knex("products")
        .where(knex.raw(`LOWER("description") like  ?`, `%${searchWord}%`))
        .andWhere(knex.raw(`LOWER("location") =  ?`, location))
        .orWhere(knex.raw(`LOWER("product_name") like  ?`, `%${searchWord}%`))
        .andWhere(knex.raw(`LOWER("location") =  ?`, location))
        .offset(offset)
        .limit(perPage);
      return response;
    } catch (e) {
      console.log(e.message);
    }
  } else if ((searchWord && !location) || location === "kaikki") {
    try {
      const response = await knex("products")
        .where(knex.raw(`LOWER("description") like  ?`, `%${searchWord}%`))
        .orWhere(knex.raw(`LOWER("product_name") like  ?`, `%${searchWord}%`))
        .offset(offset)
        .limit(perPage);
      return response;
    } catch (e) {
      console.log(e.message);
    }
  } else if (!searchWord && location && location !== "kaikki") {
    try {
      const response = await knex("products")
        .where(knex.raw(`LOWER("location") =  ?`, location))
        .offset(offset)
        .limit(perPage);
      return response;
    } catch (e) {
      console.log(e.message);
    }
  } else {
    return await getProducts(pageToSend);
  }
};

const getProducts = async (page) => {
  let pageToSend = 1;
  if (page) pageToSend = page;
  const perPage = 20;
  const offset = (pageToSend - 1) * perPage;
  try {
    return await knex
      .select("*")
      .table("products")
      .offset(offset)
      .limit(perPage);
  } catch (e) {
    console.log(e.message);
  }
};

const deleteProduct = async (id) => {
  try {
    return await knex("products").where("id", id).del();
  } catch (e) {
    console.log(e.message);
  }
};
const deleteAllProducts = async (id) => {
  try {
    return await knex("products").del();
  } catch (e) {
    console.log(e.message);
  }
};
const getProduct = async (id) => {
  try {
    return await knex("products").where("id", id).first();
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getProducts,
  getProductsWithFilters,
  getProduct,
  deleteProduct,
  deleteAllProducts,
  insertProduct,
  getTotalPages,
  getTotalPagesWithFilters,
};
