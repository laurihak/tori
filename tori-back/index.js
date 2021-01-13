const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const productsRouter = require("./controllers/products");
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");

app.use("/api/products", productsRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.get("/", async (req, res) => {
  res.send("server running");
});

app.get("/api", async (req, res) => {
  // await insertProduct();
  res.send("hello from API and nodemon");
});

app.post("/api/users", (req, res) => {});
app.delete("/api/users", (req, res) => {});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Started and listening on port: ${PORT}`));
