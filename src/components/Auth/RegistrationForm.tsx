import { Formik, Field, Form } from "formik";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types/typesOfState";
import { yupUserAuthSchema } from "../../functions/yupSchemas";

const initialValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function RegistrationForm() {
  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let appTheme = "";
  let btnTheme = "";
  let formTheme = "";
  let labelTheme = "";
  let errorTheme = "";
  if (theme === "other") {
    appTheme = "darktheme__input";
    btnTheme = "darktheme__btn";
    formTheme = "darktheme__post";
    labelTheme = "darktheme__header__brand";
    errorTheme = "darktheme__fieldError";
  }

  const [submitError, setSubmitError]: any = useState();
  function submitFunction(values: any) {
    const API_URL = process.env.REACT_APP_API_URL;
    axios
      .post(API_URL + "api/v1/users", values)
      .then((data: any) => {
        //console.log(data);
        alert("Registration successful! Now you should be able to log in.");
      })
      .then(() => {
        setSubmitError();
        window.location.reload();
      })
      .catch(function (error) {
        if (error.response) {
          setSubmitError(error.response.data.error);
        } else if (error.request) {
        } else {
          setSubmitError("Something went wrong.");
        }
      });
  }

  const [passwordVisibility, setPasswordVisibility]: any = useState("password");
  function showPassword(): void {
    if (passwordVisibility === "password") return setPasswordVisibility("text");
    if (passwordVisibility === "text") return setPasswordVisibility("password");
  }

  return (
    <div className="formbox registration">
      <h2>Register a new account</h2>
      <div className="box">
        <Formik
          initialValues={initialValues}
          validationSchema={yupUserAuthSchema}
          onSubmit={(values) => submitFunction(values)}
        >
          {({ values, errors, touched }) => (
            <Form className={`form ${formTheme}`}>
              <div className="formfield">
                <label
                  htmlFor="username"
                  className={`formfield__label ${labelTheme}`}
                >
                  Username
                </label>
                <Field
                  id="username"
                  name="username"
                  placeholder="Username"
                  type="text"
                  className={`formfield__input ${appTheme}`}
                />
                {errors.username && touched.username ? (
                  <div className={"formfield__error " + errorTheme}>
                    {errors.username}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="formfield">
                <label
                  htmlFor="email"
                  className={`formfield__label ${labelTheme}`}
                >
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  className={`formfield__input ${appTheme}`}
                />
                {errors.email && touched.email ? (
                  <div className={"formfield__error " + errorTheme}>
                    {errors.email}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="formfield">
                <label
                  htmlFor="password"
                  className={`formfield__label ${labelTheme}`}
                >
                  Password
                  <img
                    id="passwordVisibility"
                    className="passwordVisibility"
                    alt="toggle password visibility"
                    onClick={showPassword}
                    src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-eye-256.png"
                  />
                  ?
                </label>
                <Field
                  id="password"
                  name="password"
                  placeholder="Password"
                  type={passwordVisibility}
                  className={`formfield__input ${appTheme}`}
                />
                {errors.password && touched.password ? (
                  <div className={"formfield__error " + errorTheme}>
                    {errors.password}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="formfield">
                <label
                  htmlFor="confirmPassword"
                  className={`formfield__label ${labelTheme}`}
                >
                  Confirm password
                </label>
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type={passwordVisibility}
                  className={`formfield__input ${appTheme}`}
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className={"formfield__error " + errorTheme}>
                    {errors.confirmPassword}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <p>
                <b>DISCLAIMER:</b> By pressing "Submit", you agree to storing
                your information in the app's database, and you will gain access
                to the site after you log in.
              </p>
              <button
                type="submit"
                className={`btn formfield__button ${btnTheme}`}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className={"formfield__error " + errorTheme}>{submitError}</div>
    </div>
  );
}

export default RegistrationForm;
