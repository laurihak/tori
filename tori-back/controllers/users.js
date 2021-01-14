const userRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");

const {
  insertUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../models/users");

userRouter.get("/", async (req, res) => {
  const users = await getUsers();

  res.send(users);
});
userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);

  res.send(user);
});
userRouter.post("/", async (req, res) => {
  const body = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const newUser = {
    id: uuidv4(),
    username: req.body.username,
    email: req.body.email,
    password_hash: passwordHash,
    name: req.body.name,
  };

  await insertUser(newUser);
  res.status(201).json({ message: "User created succesfully" });
});
userRouter.put("/:id", (req, res) => {});
userRouter.delete("/:id", (req, res) => {});

module.exports = userRouter;
