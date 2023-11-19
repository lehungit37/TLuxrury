import Joi from 'joi';
import { IConfig } from 'src/types/config';

const envVarsSchema = Joi.object({
  REACT_APP_API_PREFIX: Joi.string().required(),
  REACT_APP_API_URL: Joi.string().required(),
  REACT_APP_DEV_API_URL: Joi.string().required(),
  REACT_APP_NODE_ENV: Joi.string().required(),
  REACT_APP_SYSTEM: Joi.string().required(),
})
  .unknown()
  .required();

const { value } = envVarsSchema.validate(process.env);

const isDev = value.REACT_APP_NODE_ENV === 'development' ? true : false;

export const CConfig: IConfig = {
  isDev,
  baseURL: isDev ? value.REACT_APP_DEV_API_URL : value.REACT_APP_API_URL,
  prefix: value.REACT_APP_API_PREFIX,
  systemName: value.REACT_APP_SYSTEM,
};
