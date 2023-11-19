import { IError, IErrors } from "../interface/errors";
import _, { isEmpty } from "lodash";

export class AppError {
  where: string;
  message: string;
  statusCode: number;
  detail?: string;
  errors?: IErrors;
  constructor(
    where: string,
    message: string,
    statusCode: number,
    detail?: string,
    errors?: IErrors
  ) {
    this.where = where;
    this.message = message;
    this.statusCode = statusCode;
    this.detail = detail;
    this.errors = errors;
  }
}
export const pushError = (error: IError, errors: IError[] = []) => {
  errors.push(error);
  return errors;
};
