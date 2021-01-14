const loginRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const { json } = require("body-parser");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const { getUserByName, getUserByEmail } = require("../models/users");

loginRouter.post("/", async (req, res) => {
  console.log("body now ", req.body);
  let user = null;
  if (!req.body.email) {
    user = await getUserByName(req.body.username);
  } else {
    user = await getUserByEmail(req.body.email);
  }

  if (!user) {
    res
      .status(401)
      .json({
        message: "Väärä sähköposti, käyttäjää ei löytynyt!",
      })
      .end();
  }
  const password = req.body.password;
  const hash = user.password_hash;
  if ((await comparePassword(password, hash)) === false) {
    res
      .status(401)
      .json({
        message: "Väärä salasana!",
      })
      .end();
  } else {
    const userForToken = {
      email: user.email,
      id: user.id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET);
    console.log("token now", token);
    const jsonToSend = {
      token,
      email: user.email,
      name: user.name,
      id: user.id,
    };
    console.log(jsonToSend);
    res.status(200).set("Content-type", "application/json").json(jsonToSend);
  }
});

const comparePassword = async (password, hash) => {
  try {
    // Compare password
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.log(error);
  }
  return false;
};

module.exports = loginRouter;
