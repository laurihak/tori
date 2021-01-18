const loginRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserByName, getUserByEmail } = require("../models/users");

loginRouter.post("/", async (req, res) => {
  let user = null;
  if (!req.body.email) {
    user = await getUserByName(req.body.username);
  } else {
    user = await getUserByEmail(req.body.email);
  }

  if (!user) {
    return res
      .status(401)
      .json({
        message: "Väärä sähköposti, käyttäjää ei löytynyt!",
      })
      .end();
  }
  const password = req.body.password;
  const hash = user.password_hash;
  if ((await comparePassword(password, hash)) === false) {
    return res
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
    const jsonToSend = {
      token,
      email: user.email,
      name: user.name,
      id: user.id,
    };
    res.status(200).set("Content-type", "application/json").json(jsonToSend);
  }
});

const comparePassword = async (password, hash) => {
  try {
    // Compare password
    return await bcrypt.compare(password, hash);
  } catch (error) {}
  return false;
};

module.exports = loginRouter;
