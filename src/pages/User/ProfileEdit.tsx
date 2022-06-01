import axios from "axios";
import jwtDecode from "jwt-decode";
import { Formik, Field, FieldArray, Form } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMyUser } from "../../redux/actions/actionUser";
import {
  UserContactLinkType,
  UserPersonalInfoType,
} from "../../types/typesOfModels/UserType";
import { RootState } from "../../types/typesOfState";
import { AuthType } from "../../types/typesOfUtility";
import FieldError from "../../components/Forms/FieldError";
import { countryList } from "../../functions/countryList";
import { booleanTransform } from "../../functions/booleanTransform";
import { VisibilityRadio } from "../../components/Forms/VisibilityRadio";
import { useNavigate } from "react-router-dom";
import dataChangeFilter from "../../functions/dataChangeFilter";
import { yupPersonalInfoSchema } from "../../functions/yupSchemas";
import Loading from "../../components/Utility/Loading";

/////////////////////////////////////////
/////////////////////////////////////////
/////////////////////////////////////////

function ProfileEdit() {
  // Initialization
  let token: any = localStorage.getItem("token");
  let auth: AuthType = jwtDecode(token);

  const { myUser } = useSelector((state: RootState) => state.userReducer);
  const [initialValues, setInitialValues]: any = useState(null);
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

  // Data fetching
  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;
    axios
      .get(`${API_URL}api/v1/users/${auth.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data: any) => {
        dispatch(getMyUser(data.data));
        setInitialValues(reassignInitialValues(data.data.personal));
      })
      .catch(function (error) {
        if (error?.response?.data) console.log(error.response.data);
      });
  }, [dispatch, auth.id, token]);

  // Form submitting

  const [submitError, setSubmitError]: any = useState();
  //console.log("errormsgstate:", submitError);

  function submitFunction(values: any) {
    // Transform string "true" / "false" to boolean
    values.name.public = booleanTransform(values.name.public);
    values.birthday.public = booleanTransform(values.birthday.public);
    // prettier-ignore
    values.location.country.public = booleanTransform(values.location.country.public);
    // prettier-ignore
    values.contacts.email.public = booleanTransform(values.contacts.email.public);
    // prettier-ignore
    values.contacts.phone.public = booleanTransform(values.contacts.phone.public);
    values.contacts.links.forEach((link: UserContactLinkType, i: number) => {
      //@ts-ignore
      link.public = booleanTransform(link.public);
    });

    // reconstruct to reflect original object model and filter to only contain changed data
    let reconstructedValue = {
      personal: dataChangeFilter(initialValues, values),
    };
    //console.log("to send:", reconstructedValue);

    const API_URL = process.env.REACT_APP_API_URL;
    axios
      .patch(`${API_URL}api/v1/users/${auth.id}`, reconstructedValue, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data: any) => {
        //console.log(data);
      })
      .then(() => {
        setSubmitError();
        navigate("/profile/");
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

  while (myUser === null || initialValues === null)
    return (
      <div className="App">
        <Loading />
      </div>
    );
  return (
    <div className="box">
      <h1>Edit profile</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={yupPersonalInfoSchema}
        onSubmit={(values) => submitFunction(values)}
      >
        {({ values, errors, touched }) => (
          <Form className={themeClass.form}>
            <div className={themeClass.formfield}>
              <label htmlFor="avatar" className={themeClass.label}>
                Avatar (url)
              </label>
              <Field
                id="avatar"
                name="avatar"
                placeholder="A link to an image"
                type="text"
                className={themeClass.input}
              />
              {
                //prettier-ignore
                <FieldError error={errors.avatar} touched={touched.avatar} />
              }
            </div>

            <div className={themeClass.formfield + " formfield__stacked"}>
              <div className="formfield__stacked__stack">
                <label htmlFor="name.firstName" className={themeClass.label}>
                  First name
                </label>
                <Field
                  id="name.firstName"
                  name="name.firstName"
                  placeholder="Your first name"
                  type="text"
                  className={themeClass.input}
                />
                {
                  //prettier-ignore
                  //@ts-ignore
                  <FieldError error={errors.name?.firstName} touched={touched.name?.firstName} />
                }
              </div>
              <div className="formfield__stacked__stack">
                <label htmlFor="name.lastName" className={themeClass.label}>
                  Last name
                </label>
                <Field
                  id="name.lastName"
                  name="name.lastName"
                  placeholder="Your first name"
                  type="text"
                  className={themeClass.input}
                />
                {
                  //prettier-ignore
                  //@ts-ignore
                  <FieldError error={errors.name?.lastName} touched={touched.name?.lastName} />
                }
              </div>
              <VisibilityRadio
                classOfLabel={themeClass.label}
                classOfInput={themeClass.input}
                fieldName="name.public"
                formValue={values.name.public}
              />
            </div>

            <div className={themeClass.formfield + " formfield__stacked"}>
              <div className="formfield__stacked__stack">
                <label htmlFor="birthday.date" className={themeClass.label}>
                  Birthday
                </label>
                <Field
                  id="birthday.date"
                  name="birthday.date"
                  type="date"
                  className={themeClass.input}
                />
                {
                  //prettier-ignore
                  //@ts-ignore
                  <FieldError error={errors.birthday?.date} touched={touched.birthday?.date} />
                }
              </div>
              <VisibilityRadio
                classOfLabel={themeClass.label}
                classOfInput={themeClass.input}
                fieldName="birthday.public"
                formValue={values.birthday.public}
              />
            </div>

            <div className={themeClass.formfield + " formfield__stacked"}>
              <div className="formfield__stacked__stack">
                <label
                  htmlFor="location.country.name"
                  className={themeClass.label}
                >
                  Country
                </label>
                <Field
                  component="select"
                  name="location.country.name"
                  className={`${themeClass.input} formfield__select`}
                  placeholder="Select country"
                >
                  <option label=""></option>
                  {countryList.map((country: string) => {
                    return (
                      <option key={country} label={country}>
                        {country}
                      </option>
                    );
                  })}
                </Field>
              </div>

              <VisibilityRadio
                classOfLabel={themeClass.label}
                classOfInput={themeClass.input}
                fieldName="location.country.public"
                formValue={values.location.country.public}
              />
            </div>

            <div className={themeClass.formfield}>
              <label htmlFor="bio" className={themeClass.label}>
                Bio
              </label>
              <Field
                component="textarea"
                id="bio"
                name="bio"
                placeholder="Your biography, a monologue, whatever you'd like..."
                type="text"
                className={`${themeClass.input} formfield__textarea`}
              />
              {
                //prettier-ignore
                //@ts-ignore
                <FieldError error={errors.bio} touched={touched.bio} />
              }
            </div>

            <div className={themeClass.formfield + " formfield__stacked"}>
              <div className="formfield__stacked__stack">
                <label
                  htmlFor="contacts.email.data"
                  className={themeClass.label}
                >
                  Email (public)
                </label>
                <Field
                  id="contacts.email.data"
                  name="contacts.email.data"
                  placeholder="Your public email address"
                  type="email"
                  className={themeClass.input}
                />
                {
                  //prettier-ignore
                  //@ts-ignore
                  <FieldError error={errors.contacts?.email?.data} touched={touched.contacts?.email?.data} />
                }
              </div>
              <VisibilityRadio
                classOfLabel={themeClass.label}
                classOfInput={themeClass.input}
                fieldName="contacts.email.public"
                formValue={values.contacts.email.public}
              />
            </div>

            <div className={themeClass.formfield + " formfield__stacked"}>
              <div className="formfield__stacked__stack">
                <label
                  htmlFor="contacts.phone.data"
                  className={themeClass.label}
                >
                  Phone number
                </label>
                <Field
                  id="contacts.phone.data"
                  name="contacts.phone.data"
                  placeholder="Your phone number"
                  type="tel"
                  className={themeClass.input}
                />
                {
                  //prettier-ignore
                  //@ts-ignore
                  <FieldError error={errors.contacts?.phone?.data} touched={touched.contacts?.phone?.data} />
                }
              </div>
              <VisibilityRadio
                classOfLabel={themeClass.label}
                classOfInput={themeClass.input}
                fieldName="contacts.phone.public"
                formValue={values.contacts.phone.public}
              />
            </div>

            <FieldArray
              name="contacts.links"
              render={() => (
                <div className={themeClass.formfield}>
                  <div className={themeClass.label}>Links</div>
                  {/*prettier-ignore*/}
                  <div className={themeClass.formfield + " formfield__stacked borderless paddingless"}>
                    <div className={themeClass.label + " formfield__label__sublabel"}>
                      Title
                    </div>
                    <div className={themeClass.label + " formfield__label__sublabel"}>
                      URL
                    </div>
                    <div className={themeClass.label + " textalign-center"}>
                      Visibility
                    </div>
                  </div>
                  {initialValues.contacts.links.map(
                    (link: UserContactLinkType, index: number) => (
                      <div
                        key={index}
                        className={themeClass.formfield + " formfield__stacked"}
                      >
                        <div className="formfield__stacked__stack">
                          <Field
                            name={`contacts.links.${index}.title`}
                            type="text"
                            placeholder={`Link title ${index + 1}`}
                            className={
                              themeClass.input +
                              " formfield__input__link--title"
                            }
                          />
                        </div>
                        <div className="formfield__stacked__stack">
                          <Field
                            name={`contacts.links.${index}.url`}
                            type="text"
                            placeholder={`Link url ${index + 1}`}
                            className={
                              themeClass.input + " formfield__input__link--url"
                            }
                          />
                        </div>
                        <VisibilityRadio
                          classOfLabel={themeClass.label}
                          classOfInput={themeClass.input}
                          fieldName={`contacts.links.${index}.public`}
                          formValue={values.contacts.links[index].public}
                          hideTheTitle={true}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            />

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

export default ProfileEdit;

function reassignInitialValues(data: UserPersonalInfoType) {
  let newValues: UserPersonalInfoType = { ...data };

  let links: UserContactLinkType[] = newValues?.contacts?.links || [];
  if (links.length < 5) {
    let defaultLink: UserContactLinkType = {
      title: "",
      url: "",
      public: false,
    };
    while (links.length < 5) links.push(defaultLink);
  }
  //@ts-ignore
  newValues.birthday.date = newValues.birthday.date.split("T")[0];

  return newValues;
}
