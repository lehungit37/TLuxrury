import dotenv from "dotenv";

dotenv.config();
export interface IConfig {
  httpPort: number;
  baseURL: string;
  apiPrefix: string;
  mongoSettings: {
    mongoUri: string;
    mongoDatabase: string;
    mongoUsername: string;
    mongoPassword: string;
  };
}

export const config: IConfig = {
  httpPort: parseInt(process.env.HTTP_PORT || "9090", 10),
  baseURL: "http://localhost:3000",
  apiPrefix: process.env.API_PREFIX || "/api/v1",

  mongoSettings: {
    mongoUri: `mongodb://${process.env.MONGO_HOST}` || "",
    mongoDatabase: process.env.MONGO_DATABASE || "",
    mongoUsername: process.env.MONGO_USERNAME || "",
    mongoPassword: process.env.MONGO_PASSWORD || "",
  },
};
