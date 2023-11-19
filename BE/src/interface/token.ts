import { ObjectId } from "mongodb";

export interface IToken {
  id?: ObjectId;
  token: string;
  createdAt: Date;
  expiredAt: Date;
  type: string;
  detail: {
    [x: string]: string | ObjectId;
  };
}
