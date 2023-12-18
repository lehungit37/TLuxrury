import { Db, ObjectId } from "mongodb";
import { IRoomBooking } from "../../interface/booking";
import { BaseStore } from "./base_store";

const project = {
  _id: 0,
  id: "$_id",
  customerName: 1,
  customerPhone: 1,
  roomId: 1,
  room: 1,
  isVerified: 1,
  timeBooking: 1,
  fromDate: 1,
  toDate: 1,
};

export class RoomBookingStore extends BaseStore {
  constructor(db: Db) {
    super(db, "RoomBookings");
  }

  async createBooking(data: IRoomBooking) {
    const result = this.collection.insertOne({
      ...data,
      roomId: new ObjectId(data.roomId),
      fromDate: new Date(data.fromDate),
      toDate: new Date(data.toDate),
      isVerified: false,
    });

    return (await result).insertedId.toString();
  }
  async getById(id: string) {
    const result = await this.collection
      .aggregate<IRoomBooking>([
        { $match: { _id: new ObjectId(id) } },

        {
          $lookup: {
            from: "Rooms",
            localField: "roomId",
            foreignField: "_id",
            as: "room",
          },
        },
        {
          $unwind: "$room",
        },
        {
          $project: project,
        },
      ])
      .toArray();

    return result[0];
  }

  async checkBooking({
    fromDate,
    toDate,
    roomId,
  }: {
    fromDate: Date;
    toDate: Date;
    roomId: string;
  }) {
    return this.collection.findOne<IRoomBooking>({
      $or: [
        {
          $and: [
            { fromDate: { $lte: new Date() } },
            { toDate: { $gte: new Date(fromDate) } },
            { roomId },
          ],
        },
        {
          $and: [
            { fromDate: { $gte: new Date(fromDate) } },
            { toDate: { $lte: new Date(toDate) } },
            { roomId },
          ],
        },
        {
          $and: [
            { fromDate: { $gte: new Date(fromDate) } },
            { toDate: { $gte: new Date(toDate) } },
            { roomId },
          ],
        },
        {
          $and: [
            { fromDate: { $lte: new Date() } },
            { toDate: { $gte: new Date() } },
            { roomId },
          ],
        },
      ],
    });
  }

  async getRoomCheckBooking({
    fromDate,
    toDate,
  }: {
    fromDate: Date;
    toDate: Date;
  }) {
    const result = this.collection
      .find<IRoomBooking>({
        $or: [
          {
            $and: [
              { fromDate: { $lte: new Date(fromDate) } },
              { toDate: { $gte: new Date(fromDate) } },
            ],
          },
          {
            $and: [
              { fromDate: { $gte: new Date(fromDate) } },
              { toDate: { $lte: new Date(toDate) } },
            ],
          },
          {
            $and: [
              { fromDate: { $gte: new Date(fromDate) } },
              { toDate: { $gte: new Date(toDate) } },
            ],
          },
          {
            $and: [
              { fromDate: { $lte: new Date(fromDate) } },
              { toDate: { $gte: new Date(toDate) } },
            ],
          },
        ],
      })
      .toArray();

    return result;
  }

  async getListRoomBooking(query: { startDate: Date; endDate: Date }) {
    const { startDate, endDate } = query;
    const result = await this.collection
      .aggregate<IRoomBooking>([
        {
          $match: {
            $or: [
              {
                fromDate: {
                  $gte: new Date(startDate),
                  $lte: new Date(endDate),
                },
                toDate: {
                  $gte: new Date(endDate),
                },
              },
              {
                fromDate: {
                  $gte: new Date(startDate),
                },
                toDate: {
                  $lte: new Date(endDate),
                },
              },
              {
                fromDate: {
                  $lte: new Date(startDate),
                },
                toDate: {
                  $gte: new Date(startDate),
                  $lte: new Date(endDate),
                },
              },
            ],
          },
        },
        {
          $lookup: {
            from: "Rooms",
            localField: "roomId",
            foreignField: "_id",
            as: "room",
          },
        },
        {
          $unwind: "$room",
        },
        {
          $project: project,
        },
      ])
      .toArray();
    return result;
  }

  countRoomBookingList = async (query: {
    page: number;
    keyword: string;
    limit: number;
  }): Promise<number> => {
    const { countQuery } = this.filterCondition(query);

    const total = this.count(countQuery);

    return total;
  };

  filterCondition = (query: {
    page: number;
    keyword: string;
    limit: number;
  }) => {
    const { keyword } = query;

    const fieldSearch = ["customerName", "customerPhone"];

    const conditionKeywordList = fieldSearch.map((field) => {
      return { [field]: { $regex: `.*${keyword}.*`, $options: "i" } };
    });

    const keywordCondition = keyword
      ? {
          $or: conditionKeywordList,
        }
      : {};

    const match = {
      $match: {
        $and: [keywordCondition],
      },
    };

    const limit = query.limit || 15;
    const skip = (query.page - 1) * limit;

    const lookup = {
      $lookup: {
        from: "Rooms",
        localField: "roomId",
        foreignField: "_id",
        as: "room",
      },
    };

    const project = {
      _id: 0,
      id: "$_id",
      customerName: 1,
      customerPhone: 1,
      roomId: 1,
      room: 1,
      isVerified: 1,
      timeBooking: 1,
      fromDate: 1,
      toDate: 1,
    };

    const dataQuery = [
      lookup,
      { $unwind: { path: "$room", preserveNullAndEmptyArrays: false } },
      match,
      { $project: project },
      { $skip: skip },
      { $limit: limit },
    ];

    return { countQuery: [match], dataQuery };
  };

  delete = async (id: string) => {
    await this.collection.deleteOne({ _id: new ObjectId(id) });

    return;
  };

  update = async (id: string, data: IRoomBooking) => {
    await this.collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...data } }
    );
  };

  getByRoomId = async (roomId: string) => {
    const result = await this.collection
      .find(
        { roomId: new ObjectId(roomId) },
        {
          projection: {
            customerName: 1,
            customerPhone: 1,
            fromDate: 1,
            toDate: 1,
            _id: 0,
            id: "$_id",
          },
        }
      )
      .toArray();

    return result;
  };
}
