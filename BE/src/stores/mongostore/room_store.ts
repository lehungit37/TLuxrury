import { ERoomStatus, IPayloadGetRoom } from "./../../interface/room";
import { BaseStore } from "./base_store";
import { Db, ObjectId } from "mongodb";
import { IPayloadGetRoomManagement, IRoom } from "../../interface/room";
export class RoomStore extends BaseStore {
  constructor(db: Db) {
    super(db, "Rooms");
  }

  async getListRoom(payload: IPayloadGetRoomManagement) {
    const { page, roomTypeId, searchKeyword } = payload;
    const keywordCondition = searchKeyword
      ? { $or: [{ name: { $regex: `.*${searchKeyword}.*`, $options: "i" } }] }
      : {};

    const roomTypeCondition = roomTypeId
      ? {
          roomTypeId: { $eq: new ObjectId(roomTypeId) },
        }
      : {};

    const limit = 16;
    const skip = (page - 1) * limit;

    const lookup = {
      from: "RoomTypes",
      let: { id: "$roomTypeId" },
      as: "roomTypes",
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$$id", "$_id"] },
          },
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
          },
        },
      ],
    };

    const result = await this.collection
      .aggregate<any[]>([
        { $lookup: lookup },
        {
          $match: {
            $and: [keywordCondition, roomTypeCondition, { deletedAt: null }],
          },
        },
        {
          $unwind: {
            path: "$roomTypes",
          },
        },
        {
          $skip: skip,
        },
        { $limit: limit },
        {
          $project: {
            _id: 0,
            id: "$_id",
            promotion: 1,
            bed: 1,
            roomTypeId: 1,
            roomTypes: 1,
            price: 1,
            name: 1,
            television: 1,
            description: 1,
            status: 1,
            isShow: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      ])
      .toArray();

    return result;
  }

  async countData(payload: IPayloadGetRoomManagement) {
    const { page, roomTypeId, searchKeyword } = payload;
    const keywordCondition = searchKeyword
      ? { $or: [{ name: { $regex: `.*${searchKeyword}.*`, $options: "i" } }] }
      : {};

    const roomTypeCondition = roomTypeId
      ? {
          roomTypeId: { $eq: new ObjectId(roomTypeId) },
        }
      : {};

    const total = this.count([
      { $match: { $and: [keywordCondition, roomTypeCondition] } },
    ]);

    return total;
  }

  async getById(roomId: string) {
    const result: any = await this.collection.findOne(
      { _id: new ObjectId(roomId) },
      {
        projection: {
          _id: 0,
          id: "$_id",
          name: 1,
          description: 1,
          roomTypeId: 1,
          bed: 1,
          television: 1,
          promotion: 1,
          status: 1,
          isShow: 1,
          price: 1,
        },
      }
    );
    return result;
  }

  async getByName(roomName: string) {
    const result = await this.collection.findOne({
      name: { $eq: roomName },
    });

    return result;
  }

  async addRoom(room: any) {
    const result = await this.collection.insertOne({
      ...room,
      roomTypeId: new ObjectId(room.roomTypeId),
    });
    return result.insertedId.toHexString();
  }

  async deleteRoom(roomId: string) {
    await this.collection.updateOne(
      { _id: new ObjectId(roomId) },
      { $set: { deletedAt: new Date() } }
    );
  }

  async updateRoom(roomId: string, newRoom: IRoom) {
    let room = { ...newRoom };

    if ("roomTypeId" in newRoom) {
      room = { ...room, roomTypeId: new ObjectId(room.roomTypeId) };
    }

    await this.collection.updateOne(
      { _id: new ObjectId(roomId) },
      { $set: room }
    );
  }

  async getRoomManage(payload: IPayloadGetRoom) {
    const lookup = {
      from: "RoomTypes",
      let: { id: "$roomTypeId" },
      as: "roomTypes",
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$$id", "$_id"] },
          },
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            name: 1,
          },
        },
      ],
    };

    const statusCondition = payload.status
      ? { status: { $eq: payload.status } }
      : {};
    const roomTypeCondition = payload.roomTypeId
      ? {
          roomTypeId: {
            $eq: new ObjectId(payload.roomTypeId),
          },
        }
      : {};

    const result = await this.collection
      .aggregate([
        { $lookup: lookup },
        {
          $match: {
            $and: [statusCondition, roomTypeCondition, { deletedAt: null }],
          },
        },
        {
          $unwind: {
            path: "$roomTypes",
          },
        },
        {
          $lookup: {
            from: "RoomBookings",
            localField: "_id",
            foreignField: "roomId",
            as: "booking",
          },
        },
        {
          $project: {
            _id: 0,
            id: "$_id",
            promotion: 1,
            bed: 1,
            roomTypeId: 1,
            roomTypes: 1,
            price: 1,
            name: 1,
            television: 1,
            description: 1,
            status: 1,
            isShow: 1,
            createdAt: 1,
            updatedAt: 1,
            totalBooking: {
              $size: "$booking",
            },
          },
        },
      ])
      .toArray();

    return result;
  }

  async getRoomCanBooking(ids: string[]) {
    const result = this.collection
      .find(
        {
          _id: { $nin: ids.map((id) => new ObjectId(id)) },
          deletedAt: null,
          status: ERoomStatus.FREE,
        },
        {
          projection: {
            _id: 0,
            id: "$_id",
            name: 1,
            price: 1,
          },
        }
      )
      .toArray();

    return result;
  }
}
