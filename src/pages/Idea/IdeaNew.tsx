import axios from "axios";
import jwtDecode from "jwt-decode";
import { Formik, Field, Form } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMyUser } from "../../redux/actions/actionUser";
import { RootState } from "../../types/typesOfState";
import { AuthType } from "../../types/typesOfUtility";
import FieldError from "../../components/Forms/FieldError";
import { BooleanRadio } from "../../components/Forms/VisibilityRadio";
import { useNavigate } from "react-router-dom";
import { IdeaDocument } from "../../types/typesOfModels/IdeaType";
import { tagSplitter } from "../../functions/tagValidation";
import Tags from "../../components/Idea/Tags";
import { yupIdeaSchema } from "../../functions/yupSchemas";
import { booleanTransform } from "../../functions/booleanTransform";

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

export default function IdeaNew() {
  let token: any = localStorage.getItem("token");
  let auth: AuthType = jwtDecode(token);

  const { myUser } = useSelector((state: RootState) => state.userReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Theme init
  const { theme } = useSelector((state: RootState) => state.themeReducer);
  let themeClass: any = {
    form: "form",
    formfield: "formfield",
    label: "formfield__label",
    input: "formfield__input",
    button: "btn formfield__button",
  };
  if (theme === "other") {
    themeClass.label += " darktheme__header__brand";
    themeClass.input += " darktheme__input";
    themeClass.button += " darktheme__btn";
  }

  const [initialValues, setInitialValues] =
    useState<Partial<IdeaDocument> | null>(null);

  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (myUser) {
      let initVals = {
        author: myUser._id,
        title: "",
        description: "",
        tags: "",
        published: true,
        anonymous: false,
      };
      setInitialValues(initVals);
    } else {
      axios
        .get(`${API_URL}api/v1/users/${auth.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data: any) => {
          dispatch(getMyUser(data.data));

          let initVals = {
            author: data.data._id,
            title: "",
            description: "",
            tags: "",
            published: true,
            anonymous: false,
          };
          setInitialValues(initVals);
        })
        .catch(function (error) {
          if (error?.response?.data) console.log(error.response.data);
        });
    }
  }, [dispatch, auth.id, token, API_URL, myUser]);

  // Form submitting

  const [submitError, setSubmitError]: any = useState();

  function submitFunction(values: Partial<IdeaDocument>) {
    let ideaId: string;
    // Transform string "true" / "false" to boolean
    let dataToSend: any = { ...values };
    dataToSend.tags = tagSplitter(dataToSend.tags);
    dataToSend.anonymous = booleanTransform(dataToSend.anonymous);
    dataToSend.published = booleanTransform(dataToSend.published);

    axios
      .post(`${API_URL}api/v1/ideas/`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data: any) => {
        ideaId = data.data._id;
      })
      .then(() => {
        setSubmitError();
        if (ideaId) navigate(`/ideas/${ideaId}`);
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

  while (!myUser || !initialValues)
    return (
      <div className="App">
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="box">
      <h1>New idea</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={yupIdeaSchema}
        onSubmit={(values) => submitFunction(values)}
      >
        {({ values, errors, touched }) => (
          <Form className={themeClass.form}>
            <div className={themeClass.formfield}>
              <label htmlFor="title" className={themeClass.label}>
                Title
              </label>
              <Field
                id="title"
                name="title"
                placeholder="A title for your idea"
                type="text"
                className={themeClass.input}
              />
              {<FieldError error={errors.title} touched={touched.title} />}
            </div>

            <div className={themeClass.formfield}>
              <label htmlFor="description" className={themeClass.label}>
                Description
              </label>
              <Field
                component="textarea"
                id="description"
                name="description"
                placeholder="Describe your idea!"
                type="text"
                className={`${themeClass.input} formfield__textarea`}
              />
              {
                //prettier-ignore
                <FieldError error={errors.description} touched={touched.description} />
              }
            </div>
            <div className={themeClass.formfield}>
              <label htmlFor="tags" className={themeClass.label}>
                Tags (separate with comma or space)
              </label>{" "}
              <Field
                id="tags"
                name="tags"
                placeholder="Enter your tags here"
                type="text"
                className={themeClass.input}
              />
              {<FieldError error={errors.tags} touched={touched.tags} />}
              {!errors.tags &&
                typeof values.tags === "string" &&
                tagSplitter(values.tags).length > 0 && (
                  <div className="tags">
                    <Tags tags={tagSplitter(values.tags)} />
                  </div>
                )}
            </div>
            <div
              className={
                themeClass.formfield + " formfield__stacked center-flex"
              }
            >
              <BooleanRadio
                classOfLabel={themeClass.label}
                classOfInput={themeClass.input}
                fieldLabel="Anonymous"
                fieldName="anonymous"
                formValue={values.anonymous}
              />
              <hr className="inelegant-spacer-please-dont-shame-me" />
              <BooleanRadio
                classOfLabel={themeClass.label}
                classOfInput={themeClass.input}
                fieldLabel="Published"
                fieldName="published"
                formValue={values.published}
              />
            </div>

            <button type="submit" className={themeClass.button}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <div className={"formfield__error "}>{submitError}</div>
    </div>
  );
}
