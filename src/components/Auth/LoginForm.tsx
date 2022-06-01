import { Formik, Field, Form } from "formik";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types/typesOfState";
import { yupUserLoginSchema } from "../../functions/yupSchemas";

const initialValues = {
  email: "",
  password: "",
};

function LoginForm() {
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
      .post(API_URL + "api/v1/users/login", values)
      .then((data: any) => {
        //console.log("data: ", data.data);
        if (data?.data?.token) {
          localStorage.setItem("token", data.data.token);
          window.location.reload();
          //dispatch(getToken(data.data.token));
        } else {
          //dispatch(getToken(""));
        }
      })
      .then(() => setSubmitError())
      .catch(function (error) {
        //console.log(error);
        if (error.response) {
          console.log(error.response.data);
          if (error?.response?.data?.error)
            return setSubmitError(error.response.data.error);
          if (error?.response?.data?.message)
            return setSubmitError(error.response.data.message);
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
    <div className="formbox">
      <h2>Log into your account</h2>
      <div className="box">
        <Formik
          initialValues={initialValues}
          validationSchema={yupUserLoginSchema}
          onSubmit={(values) => submitFunction(values)}
        >
          {({ values, errors, touched }) => (
            <Form className={`form ${formTheme}`}>
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

export default LoginForm;
