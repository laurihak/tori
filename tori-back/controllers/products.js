const productsRouter = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const {
  insertProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductsWithFilters,
  getTotalPagesWithFilters,
} = require("../models/products");

const {
  insertImage,
  deleteImage,
  deleteImages,
  getImages,
  getImage,
} = require("../models/images");

productsRouter.get("/pages", async (req, res) => {
  const query = req.query;
  let searchWord = "";
  let location = "";
  if (query.page) {
    page = query.page;
  }
  if (query.searchWord && query.searchWord.length > 1) {
    searchWord = query.searchWord.toLocaleLowerCase();
  }
  if (query && query.location) {
    location = query.location.toLocaleLowerCase();
  }
  const pages = await getTotalPagesWithFilters(searchWord, location);
  return res.send(pages);
});

productsRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const product = await getProduct(id);
  res.send(product);
});

productsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  res.status(200).end();
  if (id) {
    try {
      await deleteProduct(id);
      await deleteImages(id);
      return res.status(200);
    } catch (e) {
      res.status(400).end();
    }
  }
});

// const returnImageType = (image_name) => {
//   return image_name.split(".")[1];

//   if (returnImageType(i.image_name) === "pdf") {
//     const base64 = Buffer.from(i.image_data).toString("base64");
//     const string = "data:application/pdf;base64," + base64;
//     base64Images.push(string);
// };

productsRouter.get("/:id/images", async (req, res) => {
  const product_id = req.params.id;
  // console.log("getting images now ");
  const images = await getImages(product_id);
  const base64Images = [];
  images.forEach((i) => {
    if (i.image_data === null) return;

    const base64 = Buffer.from(i.image_data).toString("base64");
    const string = "data:image/jpeg;base64," + base64;
    base64Images.push(string);
  });
  res.send(base64Images);
});

productsRouter.get("/:id/images/:id_image", async (req, res) => {
  const id = req.params.id_image;
  const product = await getImage(id);
  if (!product) res.status(400).end();

  res.send({ pic: string });
});

productsRouter.post("/:id/images", upload.single("avatar"), (req, res) => {
  const product_id = req.params.id;
  const image = {
    id: uuidv4(),
    product_id: product_id,
    image_name: req.file.originalname.replace(/\s/g, ""),
    image_data: fs.readFileSync(req.file.path),
  };
  if (!image) return res.status(400).end();
  fs.unlinkSync(req.file.path);
  insertImage(image, product_id);
  res.send(image);
});

productsRouter.get("/", async (req, res) => {
  const query = req.query;
  let products;
  let searchWord = "";
  let location = "";
  let page = 1;
  if (query.page) {
    page = query.page;
  }
  if (query.searchWord && query.searchWord.length > 1) {
    searchWord = query.searchWord.toLocaleLowerCase();
  }
  if (query && query.location) {
    location = query.location.toLocaleLowerCase();
  }
  products = await getProductsWithFilters(searchWord, location, page);
  return res.send(products);
});
productsRouter.post("/", async (req, res) => {
  const product = req.body;
  const headers = req.headers;
  const inputDate = new Date();
  inputDate.setHours(inputDate.getHours() + 4);
  const productToAdd = {
    id: uuidv4(),
    input_date: inputDate.toISOString(),
    seller_name: product.sellerName,
    seller_id: product.seller_id,
    product_name: product.productName,
    price: product.price,
    location: product.location,
    address: product.address,
    sell_type: product.sellType,
    description: product.description,
  };
  const response = await insertProduct(productToAdd);
  if (!response) return res.status(400).end();
  return res.status(200).send(productToAdd);
});

productsRouter.put("/", async (req, res) => {
  const product = req.body;
  const headers = req.headers;
  // last updated not currently using
  // const updateDate = new Date();
  // updateDate.setHours(updateDate.getHours() + 4);
  const productToAdd = {
    id: product.id,
    input_date: product.input_date,
    seller_name: product.sellerName,
    seller_id: product.seller_id,
    product_name: product.productName,
    price: product.price,
    location: product.location,
    address: product.address,
    sell_type: product.sellType,
    description: product.description,
  };
  
  const response = await updateProduct(productToAdd);
  if (!response)
    return res.status(400).json({ message: "Virhe muokattaessa tuotetta!" });
  return res.status(200).send(productToAdd);
});

module.exports = productsRouter;
