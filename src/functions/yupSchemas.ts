import * as Yup from "yup";
import { tagsValidation } from "./tagValidation";
import {
  ageLimit,
  emailRegex,
  length,
  maxBirthDate,
  minBirthDate,
  phoneRegex,
  urlRegex,
} from "./inputCheck";
import { countryList } from "./countryList";

export const yupIdeaSchema = Yup.object().shape({
  title: Yup.string()
    .min(length.title.min, `Min ${length.title.min} characters`)
    .max(length.title.max, `Max ${length.title.max} characters`)
    .required("Required"),
  description: Yup.string()
    .min(length.description.min, `Min ${length.description.min} characters`)
    .max(length.description.max, `Max ${length.description.max} characters`),
  tags: Yup.string()
    .max(100, `Max a sum of ${100} characters allowed`)
    .matches(/^[\w\d ,]*$/gim, "English letters only!")
    .test(
      "tags-array-length-validation",
      "Invalid tags: \nmax 5 tags are allowed, \nand each must be less than 21 characters long.",
      (value) => tagsValidation(value)
    ),
});

export const yupPersonalInfoSchema = Yup.object().shape({
  avatar: Yup.string()
    .min(length.avatar.min, `Min ${length.avatar.min} characters`)
    .max(length.avatar.max, `Max ${length.avatar.max} characters`)
    .matches(urlRegex, "Must be a valid URL"),
  name: Yup.object().shape({
    firstName: Yup.string()
      .min(length.firstName.min, `Min ${length.firstName.min} characters`)
      .max(length.firstName.max, `Max ${length.firstName.max} characters`),
    lastName: Yup.string()
      .min(length.lastName.min, `Min ${length.lastName.min} characters`)
      .max(length.lastName.max, `Max ${length.lastName.max} characters`),
    public: Yup.boolean(),
  }),
  birthday: Yup.object().shape({
    date: Yup.date()
      .min(new Date(minBirthDate), `Surely you're not this ancient.`)
      .max(
        new Date(maxBirthDate),
        `You must be at least ${ageLimit} years old.`
      ),
    public: Yup.boolean(),
  }),
  location: Yup.object().shape({
    country: Yup.object().shape({
      name: Yup.string().oneOf(countryList),
      public: Yup.boolean(),
    }),
  }),
  bio: Yup.string()
    .min(length.bio.min, `Min ${length.bio.min} characters`)
    .max(length.bio.max, `Max ${length.bio.max} characters`),
  contacts: Yup.object().shape({
    email: Yup.object().shape({
      data: Yup.string()
        .min(length.email.min, `Min ${length.email.min} characters`)
        .max(length.email.max, `Max ${length.email.max} characters`)
        .matches(emailRegex, "Must be a valid email address"),
      public: Yup.boolean(),
    }),
    phone: Yup.object().shape({
      data: Yup.string()
        .min(length.phone.min, `Min ${length.phone.min} characters`)
        .max(length.phone.max, `Max ${length.phone.max} characters`)
        .matches(phoneRegex, "Must be a valid phone number"),
      public: Yup.boolean(),
    }),
    links: Yup.array().of(
      Yup.object().shape({
        title: Yup.string()
          .min(length.title.min, `Min ${length.title.min} characters`)
          .max(length.title.max, `Max ${length.title.max} characters`),
        url: Yup.string()
          .min(length.link.min, `Min ${length.link.min} characters`)
          .max(length.link.max, `Max ${length.link.max} characters`)
          .matches(urlRegex, "Must be a valid URL"),
        public: Yup.boolean(),
      })
    ),
  }),
});

export const yupUserAuthSchema = Yup.object().shape({
  username: Yup.string()
    .min(
      length.username.min,
      `Username must be at least ${length.username.min} characters`
    )
    .max(
      length.username.max,
      `Username must be shorter than ${length.username.max} characters`
    )
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
    .min(
      length.email.min,
      `Email must be at least ${length.email.min} characters`
    )
    .max(
      length.email.max,
      `Email must be shorter than ${length.email.max} characters`
    ),
  password: Yup.string()
    .min(
      length.password.min,
      `Password must be at least ${length.password.min} characters`
    )
    .max(
      length.password.max,
      `Password must be shorter than ${length.password.max} characters`
    )
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Required"),
});
