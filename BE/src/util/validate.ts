import _ from "lodash";
import joi from "joi";

export const isObjectId = (string: string) => {
  let checkValidate = new RegExp("^[0-9a-fA-F]{24}$");

  return checkValidate.test(string);
};

export const validateEmail = (email: string) => {
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  return regex.test(email);
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

  return regex.test(phoneNumber);
};

export function validateLoginPayload(data: {
  email: string;
  password: string;
}) {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const error = schema.validate(data);

  return error;
}

export function validateId(data: any) {
  const schema = joi.string().length(24).required();

  return schema.validate(data);
}

export function isPositiveInteger(str: string) {
  if (typeof str !== "string") {
    return false;
  }

  const num = Number(str);

  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
}
