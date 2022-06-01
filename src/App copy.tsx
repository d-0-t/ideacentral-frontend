import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import * as Yup from "yup";
import { Formik, Field, FieldArray, Form } from "formik";
import axios from "axios";
import { useState } from "react";

const initialValues = {
  username: "baab",
  firstName: "Ba",
  lastName: "Ab",
  email: "xyz@abc.de",
  password: "password123",
  confirmPassword: "password123",
  friends: ["AAA", "BBB", "CCC"],
  passions: [{ name: "", type: "" }],
  language: { name: "", origin: "" },
};

function App() {
  const [submitError, setSubmitError]: any = useState();
  console.log("errormsgstate:", submitError);
  function submitFunction(values: any) {
    //console.log(values);
    axios
      .post("http://localhost:5000/api/v1/users", values)
      .then((data: any) => console.log(data))
      .then(() => setSubmitError())
      .catch(function (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx

          //console.log(error.response.data);
          setSubmitError(error.response.data.error);
          //console.log(error.response.status);
          //console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          //console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          //console.log("Error", error.message);
        }
        //console.log(error.config);
      });
  }

  return (
    <div className="App">
      <Formik
        initialValues={initialValues}
        validationSchema={userSchema}
        onSubmit={(values) => submitFunction(values)}
      >
        {({ values, errors, touched }) => (
          <Form>
            <div className="oneField">
              <label htmlFor="username">Username</label>
              <br />
              <Field
                id="username"
                name="username"
                placeholder="Username"
                type="text"
              />
              {errors.username && touched.username ? (
                <div className="field-error">{errors.username}</div>
              ) : (
                ""
              )}
            </div>
            <div className="oneField">
              <label htmlFor="firstName">First Name</label>
              <br />
              <Field
                id="firstName"
                name="firstName"
                placeholder="First Name"
                type="text"
              />
            </div>
            <div className="oneField">
              <label htmlFor="lastName">Last Name</label>
              <br />
              <Field
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                type="text"
              />
            </div>
            <div className="oneField">
              <label htmlFor="email">Email</label>
              <br />
              <Field id="email" name="email" placeholder="Email" type="email" />
              {errors.email && touched.email ? (
                <div className="field-error">{errors.email}</div>
              ) : (
                ""
              )}
            </div>
            <div className="oneField">
              <label htmlFor="password">Password</label>
              <br />
              <Field
                id="password"
                name="password"
                placeholder="Password"
                type="password"
              />
              {errors.password && touched.password ? (
                <div className="field-error">{errors.password}</div>
              ) : (
                ""
              )}
            </div>
            <div className="oneField">
              <label htmlFor="confirmPassword">Confirm password</label>
              <br />
              <Field
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div className="field-error">{errors.confirmPassword}</div>
              ) : (
                ""
              )}
            </div>
            <div className="oneField">
              <label htmlFor="friends">Friends</label>
              <br />
              <FieldArray name="friends">
                {() => (
                  <div>
                    {values.friends.map((fr, index) => (
                      <Field name={`friends.${index}`} />
                    ))}
                  </div>
                )}
              </FieldArray>
            </div>
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      <div className="field-error">{submitError}</div>
    </div>
  );
}

export default App;

const userSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too short")
    .max(50, "Too much...")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(3, "Password should be minimum 3 characters long")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Required"),
});

/**
 <div className="oneField">
  <label htmlFor="friends">Friends (separate with comma)</label>
  <br />
  <FieldArray name="friends">{() => (
    //@ts-ignore
      {values.friends.map((el) => (
      <Field name={`friend.${el}`}
      />
      ))}
    )}
  </FieldArray>
</div>


  <FieldArray name="passions">{() => (
    //@ts-ignore
      {values.passions((pr, index) => (
      <div key={index}>
        <Field name={`passion.${index}`}/>
        <button type="button" onClick={() => Push({name: "", type: ""})}>Add</button>
      </div>
      ))}
    )}
  </FieldArray>
 
  */
