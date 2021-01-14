import "./AddProduct.css";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import productService from "../../services/productService";
import InputFile from "../InputFile/InputFile";
import {
  generateSellerName,
  generateProductName,
  generateLocation,
  generateAddress,
  generateSellType,
  generateDescription,
} from "./makedata";

import { useState } from "react";

const productSchema = Yup.object().shape({
  productName: Yup.string(),
  sellerName: Yup.string(),
  price: Yup.string(),
  location: Yup.string(),
  address: Yup.string(),
  sellType: Yup.string(),
  description: Yup.string(),
});

const makeData = async (file, user) => {
  var i;
  for (i = 0; i < 100; i++) {
    const newProduct = {
      product_name: generateProductName(),
      seller_name: generateSellerName(),
      seller_id: user.id,
      price: Math.floor(Math.random() * 1000 + 1),
      location: generateLocation(),
      address: generateAddress(),
      sell_type: generateSellType(),
      description: generateDescription(),
    };
    console.log("adding this product: ", newProduct);
    const response = await productService.create(newProduct, user);
    if (!response) return;
    const id = response.id;
    let i = 0;
    for (i = 0; i < 3; i++) {
      const responseImage = await productService.insertImage(id, file);
      if (!responseImage) window.alert("error inserting image");
    }
  }
};

const locationOptions = [
  "Uusimaa",
  "Varsinais-Suomi",
  "Satakunta",
  "Kanta-Häme",
  "Pirkanmaa",
  "Päijät-Häme",
  "Kymenlaakso",
  "Etelä-Karjala",
  "Etelä-Savo",
  "Pohjois-Savo",
  "Pohjois-Karjala",
  "Keski-Suomi",
  "Etelä-Pohjanmaa",
  "Pohjanmaa",
  "Keski-Pohjanmaa",
  "Pohjois-Pohjanmaa",
  "Kainuu",
  "Lappi",
  "Ahvenanmaa",
];

const sellOptions = ["Nouto", "Lähetys"];

const locationOptionsHtml = locationOptions.sort().map((o, i) => (
  <option key={i} value={o}>
    {o}
  </option>
));

const sellOptionsHtml = sellOptions.sort().map((o, i) => (
  <option key={i} value={o}>
    {o}
  </option>
));

const AddProduct = ({ user }) => {
  const [file, setFile] = useState();

  const history = useHistory();

  const handleSubmit = async ({ values }) => {
    const response = await productService.create(values, user);
    if (!response) window.alert("Tuotteen lisäys ei onnistunut!");
    console.log("response now", response);
    const id = response.id;
    if (window.confirm("Tuotteen lisäys onnistui!"))
      history.push(`/products/${id}`);
  };
  if (!user) {
    return <div>No user found no authorization to add product</div>;
  }
  const seller = user.name;

  const handleMockData = async () => {
    await makeData(file, user);
  };
  return (
    <div className="Container">
      <div className="Add-product-container">
        <InputFile file={file} setFile={setFile} />

        <Formik
          initialValues={{
            product_name: "",
            seller_name: seller,
            price: "",
            location: "",
            address: "",
            sell_type: "",
            description: "",
          }}
          validationSchema={productSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={(values, { setSubmitting }) => {
            // event.preventDefault();
            handleSubmit({ values });
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className="Form-product">
              <button type="button" onClick={handleMockData}>
                {" "}
                Tee 100 ilmoitusta
              </button>
              <div className="Input-container-product">
                <label>Tuotteen nimi: </label>
                <input
                  className="Input"
                  type="string"
                  name="product_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.product_name}
                  placeholder="Tuotteen nimi"
                />
              </div>

              <div className="Input-container-product">
                <label>Myyjan nimi: </label>
                <input
                  className="Input"
                  type="string"
                  name="seller_name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.seller_name}
                  placeholder="Myyjan nimi"
                />
              </div>
              <div className="Input-container-product">
                <label>Tuotteen hinta: </label>
                <input
                  className="Input"
                  type="string"
                  name="price"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.price}
                  placeholder="Hinta"
                />
              </div>
              <div className="Input-container-product">
                <label>Kaupunki: </label>
                <select className="Input">{locationOptionsHtml}</select>
              </div>
              <div className="Input-container-product">
                <label>Osoite: </label>
                <input
                  className="Input"
                  type="string"
                  name="address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  placeholder="Osoite"
                />
              </div>
              <div className="Input-container-product">
                <label>Myynti tapa: </label>
                <select className="Input">{sellOptionsHtml}</select>
              </div>
              <div className="Input-container-product">
                <label>Lisatietoja tuotteesta: </label>
                <textarea
                  className="Input-description"
                  type="string"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  placeholder="Lisatietoja"
                />
              </div>
              <button className="Button" type="submit" disabled={isSubmitting}>
                Lisaa ilmoitus
              </button>
              <div>
                {errors.product_name &&
                  touched.product_name &&
                  errors.product_name}
              </div>
              <div>
                {errors.seller_name &&
                  touched.seller_name &&
                  errors.seller_name}
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProduct;
