import Validator from "validator";
import isEmpty from "lodash.isempty";

export const validateSignup = (data) => {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = data.userName ? data.userName : "";
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";
  data.password2 = data.confirmPassword ? data.confirmPassword : "";

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "userName field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 3, max: 30 })) {
    errors.password = "Password must be at least 3 characters long";
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validateSignin = (data) => {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.email = data.email ? data.email : "";
  data.password = data.password ? data.password : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
