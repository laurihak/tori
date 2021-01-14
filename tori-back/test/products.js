const {
  getProducts,
  deleteProduct,
  deleteAllProducts,
  insertProduct,
} = require("../models/products.js");

const { v4: uuidv4 } = require("uuid");
const assert = require("chai").assert;
var expect = require("chai").expect;
const correctMockProduct = {
  id: uuidv4(),
  input_date: "2017-03-31T06:30:20.000Z",
  seller_id: "f62cb40d-cee5-4e84-a254-f8a821d76db2",
  product_name: "Kello",
  seller_name: "Lauri Halonen",
  price: 449,
  location: "Etelä-Savo",
  address: "Pirkanmaa 321",
  sell_type: "Nouto",
  description:
    "Ostetaan/noudetaan\n" +
    "  -autonromut(rom.tod) Huom! Romutuspalkkio 1.12 alkaen\n" +
    "  -maatalousromut\n" +
    "  Yms yms\n" +
    "  Nopea nouto/käteismaksu",
};
const falseMockProduct = {
  input_date: "2017-03-31T06:30:20.000Z",
  product_name: "Kello",
  seller_name: "Lauri Halonen",
  price: 449,
  location: "Etelä-Savo",
  address: "Pirkanmaa 321",
  sell_type: "Nouto",
  description:
    "Ostetaan/noudetaan\n" +
    "  -autonromut(rom.tod) Huom! Romutuspalkkio 1.12 alkaen\n" +
    "  -maatalousromut\n" +
    "  Yms yms\n" +
    "  Nopea nouto/käteismaksu",
};

describe("products", () => {
  beforeEach("clear db", async function () {
    await deleteAllProducts();
  });

  describe("database unit testing", () => {
    it("return empty array when db is empty ", async () => {
      const products = await getProducts();
      expect(products).to.be.an("array").that.is.empty;
    });

    it("getProducts return does not have products when empty ", async () => {
      const products = await getProducts();
      expect(products).to.not.equal();
    });

    it("insert product to be in db ", async () => {
      const products = await getProducts();
      expect(products).to.be.an("array").that.is.empty;
      await insertProduct(correctMockProduct);
      const productsAfter = await getProducts();
      expect(productsAfter).to.have.length(1);
      expect(productsAfter[0]).to.own.include({
        price: 449,
        sell_type: "Nouto",
      });
    });
    it("invalid product wont go in db ", async () => {
      const products = await getProducts();
      expect(products).to.be.an("array").that.is.empty;
      await insertProduct(falseMockProduct);
      const productsAfter = await getProducts();
      expect(productsAfter).to.have.length(0);
    });
    it("adding 3 products with same id will only add 1 ", async () => {
      const products = await getProducts();
      expect(products).to.be.an("array").that.is.empty;
      let i = 0;
      for (i = 0; i < 3; i++) {
        await insertProduct(correctMockProduct);
      }
      const productsAfter = await getProducts();
      expect(productsAfter).to.have.length(1);
    });
    it("adding 3 products with different ids will add 3 ", async () => {
      const products = await getProducts();
      expect(products).to.be.an("array").that.is.empty;
      let i = 0;
      for (i = 0; i < 3; i++) {
        await insertProduct({ ...correctMockProduct, id: uuidv4() });
      }
      const productsAfter = await getProducts();
      expect(productsAfter).to.have.length(3);
    });
    it("adding 3 correct products, then removin 1, will leave 2 in products", async () => {
      const products = await getProducts();
      expect(products).to.be.an("array").that.is.empty;
      let i = 0;
      for (i = 0; i < 3; i++) {
        await insertProduct({ ...correctMockProduct, id: uuidv4() });
      }
      const productsAfter = await getProducts();
      expect(productsAfter).to.have.length(3);
      const idToRemove = productsAfter[0].id;
      await deleteProduct(idToRemove);
      console.log();
      const productsAfterDelete = await getProducts();
      expect(productsAfterDelete).to.have.length(2);
    });
  });
});
