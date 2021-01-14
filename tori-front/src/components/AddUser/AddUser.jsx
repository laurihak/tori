import "./AddUser.css";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";

import * as Yup from "yup";
import userService from "../../services/userService";
const userSchema = Yup.object().shape({
  username: Yup.string(),
  name: Yup.string(),
  email: Yup.string().email(),
  password: Yup.string().required(),
});

const AddUser = () => {
  const history = useHistory();

  const handleSubmit = async ({ values }) => {
    const response = await userService.createUser(values);
    if (!response) return window.alert("Käyttäjää ei voitu lisätä");
    window.alert("Käyttäjä luotiin onnistuneesti");
    const id = response.id;
    history.push(`/login`);
  };
  return (
    <div className="Container">
      <div className="Add-product-container">
        <Formik
          initialValues={{
            email: "",
            username: "",
            name: "",
            password: "",
          }}
          validationSchema={userSchema}
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
                <label>Sahkoposti: </label>
                <input
                  className="Input"
                  type="string"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Sahkoposti"
                />
              </div>
              <div className="Input-container-product">
                <label>Kayttajanimesi: </label>
                <input
                  className="Input"
                  type="string"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="Kayttajanimesi"
                />
              </div>
              <div className="Input-container-product">
                <label>Nimesi: </label>
                <input
                  className="Input"
                  type="string"
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Nimesi"
                />
              </div>
              <div className="Input-container-product">
                <label>Salasana: </label>
                <input
                  className="Input"
                  id="password"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Salasana"
                />
              </div>
              <button className="Button" type="submit" disabled={isSubmitting}>
                Lisaa kayttaja
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

export default AddUser;
