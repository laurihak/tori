import "./AddProduct.css";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import productService from "../../services/productService";

import {
  generateSellerName,
  generateProductName,
  generateLocation,
  generateAddress,
  generateSellType,
  generateDescription,
} from "./makedata";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const InputFile = ({ file, setFile }) => {
  const { id } = useParams();

  const [images, setImages] = useState([]);

  const urlToImages = `${process.env.REACT_APP_API_URL}/products/${id}/images`;

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };
  const fileFromServer = require("../AddProduct/images/test.jpeg").default;

  console.log("file in change inputfile", file);
  console.log("file in change but from server", fileFromServer);

  const uploadPhoto = async (event) => {
    if (!file) {
      return;
    }
    try {
      productService.insertImage(id, file);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/products/${id}/images`
        );
        if (!response || !response.data.length === 0) return;
        setImages(response.data);
      } catch (e) {
        console.log(e.message);
      }
    };
    getImage();
  }, [id]);

  console.log("images now ", images);
  return (
    <div className="Container">
      <div className="Container-add-photo">
        <div className="Container-preview-photos">
          {!images
            ? null
            : images.map((img, i) => (
                <img
                  key={i}
                  className="Product-photos"
                  src={img}
                  alt="not found"
                />
              ))}
        </div>
        {!file ? null : (
          <img
            className="Photo-preview"
            src={URL.createObjectURL(file)}
            alt="not found"
          />
        )}
        <div className="button-wrap">
          <label className="Choose-file-button" htmlFor="upload">
            Choose file
          </label>
          <input
            accept="image/jpeg"
            id="upload"
            type="file"
            name="file"
            onChange={(event) => handleChange(event)}
          />
        </div>
        <label
          className="Upload-photo-button"
          onClick={uploadPhoto}
          accept="image/jpeg"
          name="file"
        >
          Upload
        </label>
        <div style={{ marginTop: "15px" }}>
          File name: {!file ? "not found" : file.name}
        </div>
      </div>
    </div>
  );
};

const productSchema = Yup.object().shape({
  productName: Yup.string(),
  sellerName: Yup.string(),
  price: Yup.string(),
  location: Yup.string(),
  address: Yup.string(),
  sellType: Yup.string(),
  description: Yup.string(),
});

const makeData = async (file) => {
  var i;
  for (i = 0; i < 100; i++) {
    const newProduct = {
      product_name: generateProductName(),
      seller_name: generateSellerName(),
      price: Math.floor(Math.random() * 1000 + 1),
      location: generateLocation(),
      address: generateAddress(),
      sell_type: generateSellType(),
      description: generateDescription(),
    };
    const response = await productService.create(newProduct);
    if (!response) return;
    const id = response.id;
    const responseImage = await productService.insertImage(id, file);
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

const locationOptionsHtml = locationOptions.sort().map((o, i) => (
  <option key={i} value={o}>
    {o}
  </option>
));

const AddProduct = ({ user }) => {
  const [file, setFile] = useState();

  const history = useHistory();

  const handleSubmit = async ({ values }) => {
    const response = productService.create(values);
    const id = response.id;
    // history.push(`/products/${id}`);
  };
  if (!user) {
    return <div>No user found no authorization to add product</div>;
  }
  const seller = user.name;

  const handleMockData = async () => {
    await makeData(file);
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
              <button onClick={handleMockData}> Tee 100 ilmoitusta</button>
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
                <input
                  className="Input"
                  type="string"
                  name="sell_type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.sell_type}
                  placeholder="Myyntitapa"
                />
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
