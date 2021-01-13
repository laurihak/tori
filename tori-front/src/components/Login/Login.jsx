import { useHistory } from "react-router-dom";
import "./Login.css";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(4, "Too short!").required("Password required"),
});

const API_URL = process.env.REACT_APP_API_URL;

const Login = ({ setLogInfo }) => {
  const history = useHistory();
  const handleSubmit = async ({ values }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: values.email,
        password: values.password,
      });
      if (response.data.token) {
        window.localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data)
        );
        setLogInfo(true);
        history.push("/product-list");
      }
    } catch (e) {
      window.alert("password or username wrong");
    }
  };
  return (
    <div className="Login-container">
      <h1>Log in mate</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={signUpSchema}
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
          <form onSubmit={handleSubmit}>
            <div className="Input-container">
              <input
                className="Input"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                placeholder="Sahkoposti"
              />
            </div>

            <div className="Input-container">
              <input
                className="Input"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                placeholder="Salasana"
              />
            </div>
            <button className="Button" type="submit" disabled={isSubmitting}>
              Log in
            </button>
            <div>{errors.email && touched.email && errors.email}</div>
            <div>{errors.password && touched.password && errors.password}</div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
