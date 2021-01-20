const userRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");

const {
  insertUser,
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../models/users");

userRouter.get("/", async (req, res) => {
  const users = await getUsers();
  if (!users)
    return res.status(400).json({ message: "Virhe, käyttäjiä ei löytynyt!" });
  return res.send(users);
});
userRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);
  if (!users)
    return res.status(400).json({ message: "Virhe, käyttäjää ei löytynyt!" });
  return res.send(user);
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
  // last updated not currently using
  // const updateDate = new Date();
  // updateDate.setHours(updateDate.getHours() + 4);
  const response = await insertUser(newUser);
  if (!response)
    return res.status(400).json({ message: "Virhe lisättäessä käyttäjää!" });
  res.status(201).json({ message: "User created succesfully" });
});
// userRouter.put("/:id", (req, res) => {
//   const user = req.body;
//   const headers = req.headers;
//   const productToAdd = {
//     id: user.id,
//     input_date: user.input_date,
//     seller_name: user.sellerName,
//     seller_id: user.seller_id,
//     product_name: user.productName,
//     price: user.price,
//     location: user.location,
//     address: user.address,
//     sell_type: user.sellType,
//     description: user.description,
//   };

//   const response = await updateUser(productToAdd);
//   if (!response)
//     return res.status(400).json({ message: "Virhe muokattaessa tuotetta!" });
//   return res.status(200).send(productToAdd);
// });

userRouter.delete("/:id", (req, res) => {});

module.exports = userRouter;
