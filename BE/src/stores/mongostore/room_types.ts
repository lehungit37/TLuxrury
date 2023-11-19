import { Db } from "mongodb";
import { BaseStore } from "./base_store";

interface IRoomTypes {
  id: string;
  name: string;
}

export class RoomTypesStore extends BaseStore {
  constructor(db: Db) {
    super(db, "RoomTypes");
  }

  async getAll() {
    const result = await this.collection
      .find<IRoomTypes>(
        {},
        {
          projection: {
            _id: 0,
            id: "$_id",
            name: 1,
          },
        }
      )
      .toArray();

    return result;
  }
}
