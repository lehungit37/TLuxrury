import Joi from 'joi';

interface IConfig {
  isDevEnv: boolean;
  baseUrl: string;
  nodeEnv: string;
  prefix: string;
  iceServers: {
    turnAddress: string;
    turnUsername: string;
    turnPassword: string;
  };
  signalingUrl: string;
  systemName: 'SITECH' | 'STNMT' | 'STTTT';
  googleMapApiKey: string;
  apiThanhtra: string;
}

const envVarsSchema = Joi.object({
  // Node environment
  REACT_APP_NODE_ENV: Joi.string().required(),
  REACT_APP_API_PREFIX: Joi.string().required(),
  // Production server
  REACT_APP_API_URL: Joi.string().required(),
  // Dev server
  REACT_APP_DEV_API_URL: Joi.string().required(),

  //iceServers
  REACT_APP_TURN_ADDRESS: Joi.string().required(),
  REACT_APP_TURN_USERNAME: Joi.string().required(),
  REACT_APP_TURN_PASSWORD: Joi.string().required(),
  REACT_APP_SIGNALING_SERVER_ADDRESS: Joi.string().required(),
  REACT_APP_SYSTEM: Joi.string().required(),
  REACT_APP_API_ADDRESS_THANH_TRA: Joi.string().required(),
  REACT_APP_GOOGLE_MAP_API_KEY: Joi.string().required(),
})
  .unknown()
  .required();

const { value } = envVarsSchema.validate(process.env);

const isDevEnv = value.REACT_APP_NODE_ENV === 'development' ? true : false;
const config: IConfig = {
  isDevEnv,
  nodeEnv: value.REACT_APP_NODE_ENV,
  prefix: value.REACT_APP_API_PREFIX,
  baseUrl: isDevEnv ? value.REACT_APP_DEV_API_URL : value.REACT_APP_API_URL,
  iceServers: {
    turnAddress: value.REACT_APP_TURN_ADDRESS,
    turnUsername: value.REACT_APP_TURN_USERNAME,
    turnPassword: value.REACT_APP_TURN_PASSWORD,
  },
  signalingUrl: value.REACT_APP_SIGNALING_SERVER_ADDRESS,
  systemName: value.REACT_APP_SYSTEM,
  apiThanhtra: value.REACT_APP_API_ADDRESS_THANH_TRA,
  googleMapApiKey: value.REACT_APP_GOOGLE_MAP_API_KEY,
};

export default config;
