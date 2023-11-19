import { config } from "./../../config/index";
import { Db, ObjectId } from "mongodb";

import { SessionModel } from "../../models/session";
import { ErrNotFound } from "../errors";
import { BaseStore } from "./base_store";

const projection = {
  _id: 0,
  id: "$_id",
  userId: 1,
  isOAuth: 1,
  props: 1,
  token: 1,
  createdAt: 1,
  lastActivityAt: 1,
  expiresAt: 1,
};

export class SessionStore extends BaseStore {
  constructor(db: Db) {
    super(db, "Sessions");
  }

  get = async (sessionIdOrToken: string) => {
    let findKey = ObjectId.isValid(sessionIdOrToken) ? "_id" : "token";

    const result = await this.collection.findOne<SessionModel>(
      { [findKey]: sessionIdOrToken },
      { projection }
    );

    if (!result) throw new ErrNotFound("Session", sessionIdOrToken);
    return result;
  };

  getSessions = async (userId: string) => {
    const sessions = await this.collection
      .find<SessionModel>(
        {
          userId,
        },
        { projection }
      )
      .toArray();
    return sessions;
  };

  create = async (session: SessionModel) => {
    session.preSave();

    const result = await this.collection.insertOne(session);

    if (result.insertedId) {
      session.id = result.insertedId;
    }

    return session;
  };

  delete = async (sessionId: string) => {
    return await this.collection.deleteOne({ token: sessionId });
  };

  updateExpiresAt = async (sessionId: string, time: Date) => {
    return await this.collection.updateOne(
      { _id: new ObjectId(sessionId) },
      { $set: { expiresAt: time } }
    );
  };

  revokeAllSessionOfUser = async (userId: string) => {
    return await this.collection.deleteMany({
      userId,
    });
  };

  revokeOneSessionOfUser = async (userId: string, sessionId: string) => {
    return await this.collection.deleteOne({
      userId,
      _id: new ObjectId(sessionId),
    });
  };
}
