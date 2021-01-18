import "./EditProduct.css";
import { useHistory, useParams } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

import productService from "../../services/productService";
import InputFile from "../InputFile/InputFile";

import { useEffect, useState } from "react";

const productSchema = Yup.object().shape({
  productName: Yup.string().required("Tuotteen nimi vaaditaan!"),
  sellerName: Yup.string().required("Myyjän nimi vaaditaan!"),
  price: Yup.number().integer().typeError("Hinnan täytyy olla kokonaisluku!").required("Hinta vaaditaan!"),
  location: Yup.string().required("Paikka vaaditaan!"),
  address: Yup.string().required("Osoite vaaditaan!"),
  sellType: Yup.string().required("Myyntitapa vaaditaan!"),
  description: Yup.string(),
});

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

const EditProduct = ({ user }) => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const [file, setFile] = useState();

  const history = useHistory();

  useEffect(() => {
    const getProduct = async () => {
      console.log("id now ", id);
      try {
        const response = await productService.getById(id);
        if (!response) {
          window.alert("Tuotetta ei löytynyt");
        }
        setProduct(response);
      } catch (e) {
        if (e && e.response && e.response.data && e.response.data.message)
          window.alert(e.response.data.message);
        else {
          window.alert(e);
        }
      }
    };
    getProduct();
  }, [id]);

  const handleSubmit = async ({ values }) => {
    const newObject = {
      ...values,
      id: product.id,
      input_date: product.input_date,
      seller_id: product.seller_id,
    };
    try {
      const response = await productService.update(newObject);
      const id = response.id;
      if (window.confirm("Tuotteen muokkaus onnistui!"))
        history.push(`/products/${id}`);
    } catch (e) {
      window.alert(e.response.data.message);
    }
  };

  if (!user) {
    return <div>Käyttäjää ei löytynyt</div>;
  } else if (!product) {
    return <div>Tuotetta ei löytynyt</div>;
  }
  console.log(product);
  return (
    <div className="Container">
      <div className="Add-product-container">
        <InputFile file={file} setFile={setFile} />

        <Formik
          initialValues={{
            productName: product.product_name,
            sellerName: user.name,
            price: product.price,
            location: product.location,
            address: product.address,
            sellType: product.sell_type,
            description: product.description,
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
              <div className="Input-container-product">
                <label>Tuotteen nimi: </label>
                <input
                  className="Input"
                  type="string"
                  name="productName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.productName}
                  placeholder="Tuotteen nimi"
                />
                <div className="Error">
                  {errors.productName &&
                    touched.productName &&
                    errors.productName}
                </div>
              </div>

              <div className="Input-container-product">
                <label>Myyjän nimi: </label>
                <input
                readOnly
                  className="Input Input-seller"
                  type="string"
                  name="sellerName"
                  // onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.sellerName}
                  placeholder="Myyjan nimi"
                />

                <div className="Error">
                  {errors.sellerName && touched.sellerName && errors.sellerName}
                </div>
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
                <div className="Error">
                  {errors.price && touched.price && errors.price}
                </div>
              </div>
              <div className="Input-container-product">
                <label>Kaupunki: </label>
                <select className="Input">{locationOptionsHtml}</select>
                <div className="Error">
                  {errors.location && touched.location && errors.location}
                </div>
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
                <div className="Error">
                  {errors.address && touched.address && errors.address}
                </div>
              </div>
              <div className="Input-container-product">
                <label>Myynti tapa: </label>
                <select className="Input">{sellOptionsHtml}</select>
              </div>
              <div className="Input-container-product">
                <label>Lisätietoja tuotteesta: </label>
                <textarea
                  className="Input-description"
                  type="string"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  placeholder="Lisatietoja"
                />
                <div className="Error">
                  {errors.description &&
                    touched.description &&
                    errors.description}
                </div>
              </div>
              <button className="Button" type="submit" disabled={isSubmitting}>
                Päivitä ilmoitus
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProduct;
