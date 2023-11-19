import { Db, ObjectId } from "mongodb";

import { IToken } from "../../interface/token";
import { ErrNotFound } from "../errors";
import { BaseStore } from "./base_store";

export class TokenStore extends BaseStore {
  constructor(db: Db) {
    super(db, "Tokens");
  }

  getByToken = async (token: string, userId: string) => {
    const result = await this.collection.findOne<IToken>({
      token,
      "detail.userId": new ObjectId(userId),
    });
    if (!result) throw new ErrNotFound("Failed to get Token with token", token);

    return result;
  };

  create = async (data: IToken) => {
    const { insertedId } = await this.collection.insertOne(data);
    return { ...data, id: insertedId };
  };

  update = async (token: string) => {
    return await this.collection.updateOne(
      { token },
      {
        $set: {
          createdAt: new Date(),
        },
      }
    );
  };

  delete = async (token: string) => {
    return await this.collection.deleteOne({ token });
  };
}
