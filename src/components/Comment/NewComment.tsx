import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../types/typesOfState";
import { yupCommentSchema } from "../../functions/yupSchemas";

type NewCommentComponent = { authorId: string; ideaId: string };
function NewComment({ authorId, ideaId }: NewCommentComponent) {
  const initialValues = {
    author: authorId,
    idea: ideaId,
    comment: "",
  };

  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let inputTheme = "";
  let btnTheme = "";
  let formTheme = "";
  //let labelTheme = "";
  let errorTheme = "";
  if (theme === "other") {
    inputTheme = "darktheme__input";
    btnTheme = "darktheme__btn";
    formTheme = "darktheme__post";
    //labelTheme = "darktheme__header__brand";
    errorTheme = "darktheme__fieldError";
  }

  let token: any = localStorage.getItem("token");
  const [submitError, setSubmitError]: any = useState();
  function submitFunction(values: any) {
    const API_URL = process.env.REACT_APP_API_URL;
    console.log(values);
    axios
      .post(API_URL + "api/v1/comments/", values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data: any) => {
        console.log(data);
      })
      .then(() => {
        setSubmitError();
        window.location.reload();
      })
      .catch(function (error) {
        //console.log(error);
        if (error.response) {
          console.log(error.response.data);
          let errorMessage =
            error?.response?.data?.error || error.response.data.message;
          return setSubmitError(errorMessage);
        } else {
          setSubmitError("Something went wrong.");
        }
      });
  }

  return (
    <div className="comment--new">
      <Formik
        initialValues={initialValues}
        validationSchema={yupCommentSchema}
        onSubmit={(values) => submitFunction(values)}
      >
        {({ values, errors, touched }) => (
          <Form className={`form ${formTheme}`}>
            <div className="formfield">
              <Field
                component="textarea"
                id="comment"
                name="comment"
                placeholder="Share your thoughts..."
                type="text"
                className={`formfield__input ${inputTheme} formfield__textarea`}
              />
              {errors.comment && touched.comment ? (
                <div className={"formfield__error " + errorTheme}>
                  {errors.comment}
                </div>
              ) : (
                ""
              )}
            </div>
            <button
              type="submit"
              className={`btn formfield__button ${btnTheme}`}
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
      <div className={"formfield__error " + errorTheme}>{submitError}</div>
    </div>
  );
}

export default NewComment;
