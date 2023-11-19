import { Collection, Db } from "mongodb";

export class BaseStore {
  collection: Collection;

  constructor(db: Db, public collectionName: string) {
    this.collection = db.collection<any>(collectionName);
  }

  count = async (query: any[]) => {
    const result = await this.collection
      .aggregate([...query, { $count: "total" }])
      .toArray();

    if (result.length === 0) {
      return 0;
    }

    return result[0].total;
  };
}
