const { v4: uuidv4 } = require("uuid");
const knex = require("../knex.js");

const insertUser = async (user) => {
  try {
    return await knex("users").insert(user);
  } catch (e) {
    console.log(e.message);
  }
};

const updateUser = async (user) => {
  console.log("updating this: ", user);
  try {
    return await knex("users").update(product).where("id", user.id);
  } catch (e) {
    console.log(e.message);
  }
};

const getUsers = async () => {
  try {
    return await knex.select().table("users");
  } catch (e) {
    console.log(e.message);
  }
};

const deleteUser = async (id) => {
  try {
    return await knex("users").where("id", id).del();
  } catch (e) {
    console.log(e.message);
  }
};

const deleteAllUsers = async () => {
  try {
    return await knex("users").del();
  } catch (e) {
    console.log(e.message);
  }
};
const getUserById = async (id) => {
  try {
    return await knex("users").where("id", id).first();
  } catch (e) {
    console.log(e.message);
  }
};
const getUserByName = async (username) => {
  try {
    return await knex("users").where("username", username).first();
  } catch (e) {
    console.log(e.message);
  }
};

const getUserByEmail = async (email) => {
  try {
    return await knex("users").where("email", email).first();
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  getUserById,
  getUserByEmail,
  getUserByName,
  getUsers,
  deleteUser,
  deleteAllUsers,
  insertUser,
};
