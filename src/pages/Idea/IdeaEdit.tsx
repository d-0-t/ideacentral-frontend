import axios, { AxiosError } from "axios";
import { Formik, Field, Form } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../types/typesOfState";
import { BooleanRadio } from "../../components/Forms/VisibilityRadio";
import { useNavigate, useParams } from "react-router-dom";
import { tagSplitter } from "../../functions/tagValidation";
import { IdeaDocument } from "../../types/typesOfModels/IdeaType";
import { yupIdeaSchema } from "../../functions/yupSchemas";
import FieldError from "../../components/Forms/FieldError";
import Loading from "../../components/Utility/Loading";
import Tags from "../../components/Idea/Tags";
import { booleanTransform } from "../../functions/booleanTransform";
import jwtDecode from "jwt-decode";
import { AuthType, ErrorResponseType } from "../../types/typesOfUtility";
import {
  errorResponseObjectConstructor,
  errorUnauthorized,
} from "../../functions/errorResponseObjectConstructor";
import ErrorPage from "../Utility/ErrorPage";

export default function IdeaEdit() {
  // Initialization
  let token: any = localStorage.getItem("token");
  let auth: AuthType = jwtDecode(token);
  let { ideaId } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState<
    Partial<IdeaDocument> | null | undefined
  >();

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

  const [failedRequest, setFailedRequest] = useState<
    ErrorResponseType | undefined
  >();

  const [deleteContent, setDeleteContent] = useState<boolean>(false);
  function toggleDeleteContent() {
    if (deleteContent) setDeleteContent(false);
    else setDeleteContent(true);
  }

  const API_URL = process.env.REACT_APP_API_URL;

  let fetchIdeaData = useCallback(() => {
    //prettier-ignore
    axios
      .get(`${API_URL}api/v1/ideas/${ideaId}`, {
        headers: { Authorization: `Bearer ${token}`},
      })
      .then((data: any) => {        
        let idea = data.data;
        let initVals = {
          title: idea.title,
          description: idea.description,
          tags: idea.tags.join(", "),
          anonymous: idea.anonymous,
          published: idea.published
        }
        setInitialValues(initVals);
        
        let author = typeof idea.author === "string" ? idea.author : idea.author._id;
        if (author !== auth.id) setFailedRequest(errorUnauthorized);

        if (data.data.title.length > 11) {
          document.title = `Edit - ${data.data.title.slice(0, 8)}... - IdeaCentral`;
        } else {
          document.title = `Edit - ${data.data.title} - IdeaCentral`;
        }
      })
      .catch(function (error) {
        console.log(error);
        let err: any = errorResponseObjectConstructor(error as AxiosError);
        setFailedRequest(err);
      });
  }, [ideaId, API_URL, token, auth.id]);

  useEffect(() => {
    fetchIdeaData();
  }, [fetchIdeaData]);

  // Submit form
  const [submitError, setSubmitError]: any = useState();
  function submitFunction(values: Partial<IdeaDocument>) {
    let ideaCheck: string;
    let dataToSend: any = { ...values };
    dataToSend.tags = tagSplitter(dataToSend.tags);
    dataToSend.anonymous = booleanTransform(dataToSend.anonymous);
    dataToSend.published = booleanTransform(dataToSend.published);

    axios
      .patch(`${API_URL}api/v1/ideas/${ideaId}`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data: any) => {
        ideaCheck = data.data._id;
      })
      .then(() => {
        setSubmitError();
        if (ideaCheck) navigate(`/ideas/${ideaId}`);
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

  function deleteThisIdea() {
    axios
      .delete(`${API_URL}api/v1/ideas/${ideaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data: any) => {
        console.log("Deletion successful: ", data.data);
      })
      .then(() => {
        navigate(`/ideas/public`);
      })
      .catch(function (error) {
        if (error.response) {
          setSubmitError(
            error.response.data.error || error.response.data.message
          );
        } else if (error.request) {
        } else {
          setSubmitError("Something went wrong.");
        }
      });
  }

  while (typeof initialValues === "undefined") return <Loading />;
  while (initialValues === null)
    return (
      <div className="App">
        <h1>Something went wrong.</h1>
      </div>
    );

  while (failedRequest) return <ErrorPage error={failedRequest} />;

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

      <div className="delete-prompt">
        <div
          className={themeClass.button + " btn__red"}
          onClick={() => toggleDeleteContent()}
        >
          {!deleteContent ? "Delete idea?" : "Cancel deletion"}
        </div>
        {deleteContent && (
          <p className="break-word">
            Are you sure you want to delete this idea? If yes, please click the
            button below. <br />
            <b>Warning:</b> This process cannot be undone.
          </p>
        )}
        {deleteContent && (
          <div className="flex-row">
            <div
              className={themeClass.button + " btn__red"}
              onClick={() => deleteThisIdea()}
            >
              YES, DELETE THIS IDEA!
            </div>
            <div
              className={themeClass.button + " btn__green"}
              onClick={() => toggleDeleteContent()}
            >
              No, cancel!
            </div>
          </div>
        )}
      </div>
      <div className={"formfield__error "}>{submitError}</div>
    </div>
  );
}
