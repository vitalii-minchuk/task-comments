/* eslint-disable no-useless-escape */
import * as Yup from 'yup';

// const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
const ANTI_XSS_REGEX =
  /^(\s|\w|\d|\.|\,|\;|\:|\?|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\_|\~|\`|\'|\\|\-|\/|\+)*?$/;
// const CLOSING_HTML_TAG_REGEX =
//   /^(?:<(\w+)(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)>[^<>]*<\/\1+\s*>|<\w+(?:(?:\s+\w+(?:\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/>|<!--.*?-->|[^<>]+)*$/;
const VALID_URL_REGEX =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

export type UserSubmitLoginForm = {
  email: string;
  password: string;
};

export const loginUserValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Email is invalid')
    .matches(ANTI_XSS_REGEX, 'hello'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(44, 'Password must not exceed 44 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase character')
    .matches(
      /([a-z])/,
      'Password must contain at least one lowercase character'
    )
    .matches(/(\d)/, 'Password must contain at least one number')
    .matches(ANTI_XSS_REGEX, 'hello'),
});

export type UserSubmitRegisterForm = {
  username: string;
  email: string;
  password: string;
  homePageUrl?: string;
};

export const registerUserValidationSchema = Yup.object().shape(
  {
    username: Yup.string()
      .required('Username is required')
      .min(2, 'Username must be at least 2 characters')
      .max(64, 'Username must not exceed 64 characters')
      .matches(ANTI_XSS_REGEX, 'hello'),
    email: Yup.string()
      .required('Email is required')
      .email('Email is invalid')
      .matches(ANTI_XSS_REGEX, 'hello'),
    homePageUrl: Yup.string()
      .required('This field is required')
      .when('homePageUrl', (value: string) =>
        value?.length > 0
          ? Yup.string()
              .matches(ANTI_XSS_REGEX, 'hello')
              .matches(VALID_URL_REGEX, 'Url is invalid')
          : Yup.string()
      ),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(44, 'Password must not exceed 40 characters')
      .matches(
        /[A-Z]/,
        'Password must contain at least one uppercase character'
      )
      .matches(
        /([a-z])/,
        'Password must contain at least one lowercase character'
      )
      .matches(/(\d)/, 'Password must contain at least one number')
      .matches(ANTI_XSS_REGEX, 'hello'),
  },
  [['homePageUrl', 'homePageUrl']]
);

export type SubmitTextForm = {
  text: string;
};

export const textValidationSchema = Yup.object().shape({
  text: Yup.string()
    .required('Field can not be empty')
    .min(20, 'Text must be at least 20 characters')
    .max(640, 'Text must not exceed 640 characters'),
  // .matches(CLOSING_HTML_TAG_REGEX, 'Closing tag is not found'),
});

// <img src='#' onerror=alert(1) />
