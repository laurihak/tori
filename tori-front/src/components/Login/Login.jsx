import { useHistory } from "react-router-dom";
import "./Login.css";
import { Formik } from "formik";
import * as Yup from "yup";
import loginService from "../../services/loginService";

const signUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email required"),
  password: Yup.string().min(4, "Too short!").required("Password required"),
});

const Login = ({ setLogInfo }) => {
  const history = useHistory();
  const handleSubmit = async ({ values }) => {
    try {
      const response = await loginService.login({
        email: values.email,
        password: values.password,
      });
      if (response.token) {
        const jsonResponse = JSON.stringify(response);
        const parsedResponse = JSON.parse(jsonResponse);
        console.log(JSON.parse(jsonResponse).name);
        window.alert(
          `Kirjautuminen onnistui kayttajalla: ${parsedResponse.name}!`
        );
        window.localStorage.setItem("loggedInUser", jsonResponse);
        setLogInfo(true);
        history.push("/product-list");
      }
    } catch (e) {
      if (e.response && e.response.data && e.response.data.message)
        window.alert(e.response.data.message);
      else {
        console.log();
        window.alert(e);
      }
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
