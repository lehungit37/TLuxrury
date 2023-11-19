import { BaseStore } from "./base_store";
import { Db, ObjectId } from "mongodb";
import { IPayloadGetUser, IUser } from "../../interface/user";
import _ from "lodash";

const userProjection = {
  _id: 0,
  id: "$_id",
  name: 1,
  email: 1,
  password: 1,
  phoneNumber: 1,
  description: 1,
  workplace: 1,
  address: 1,
  role: 1,
  roleId: 1,
  emailVerified: 1,
};

export class UserStores extends BaseStore {
  constructor(db: Db) {
    super(db, "Users");
  }

  getUserByEmail = async (email: string) => {
    return await this.collection.findOne<IUser>(
      { email, deletedAt: null },
      { projection: userProjection }
    );
  };

  login = async (email: string, password: string) => {
    const result = await this.collection.findOne<IUser>({
      email,
      password,
    });

    return result;
  };

  checkExistEmail = async (
    email: string
  ): Promise<{ exist: boolean; id?: string }> => {
    const result = await this.collection.findOne({ email, deletedAt: null });

    if (_.isEmpty(result)) {
      return { exist: false };
    }
    return {
      exist: true,
      id: result._id.toHexString(),
    };
  };

  filterCondition = async (query: IPayloadGetUser, roleLevel: number) => {
    const { keyword } = query;

    // const fieldSearch = [
    //   "name",
    //   "email",
    //   "phoneNumber",
    //   "description",
    //   "address",
    //   "workplace",
    // ];

    // const conditionKeywordList = fieldSearch.map((field) => {
    //   return { [field]: { $regex: `.*${keyword}.*`, $options: "i" } };
    // });

    // const keywordCondition = keyword
    //   ? {
    //       $or: conditionKeywordList,
    //     }
    //   : {};

    const match = {
      $match: {
        $and: [{ deletedAt: null }],
      },
    };

    const lookup = {
      $lookup: {
        from: "Roles",
        as: "role",
        let: { roleId: "$roleId" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$_id", "$$roleId"] },
              level: {
                $gte: roleLevel,
              },
            },
          },
          {
            $project: {
              id: "$_id",
              _id: 0,
              name: 1,
              builtIn: 1,
              description: 1,
              permissions: 1,
              level: 1,
            },
          },
        ],
      },
    };
    const unwind = {
      $unwind: {
        path: "$role",
      },
    };

    const project = {
      _id: 0,
      id: "$_id",
      name: 1,
      email: 1,
      phoneNumber: 1,
      description: 1,
      role: 1,
      roleId: 1,
      isDefault: 1,
    };

    const limit = query.limit || 15;
    const skip = (query.page - 1) * limit;

    const dataQuery = [
      {
        $sort: {
          createdAt: -1,
        },
      },
      match,
      lookup,
      unwind,
      { $project: project },
      { $skip: skip },
      { $limit: limit },
    ];

    return { countQuery: [match, lookup, unwind], dataQuery };
  };

  countUserList = async (
    query: IPayloadGetUser,
    roleLevel: number
  ): Promise<number> => {
    const { countQuery } = await this.filterCondition(query, roleLevel);

    const total = this.count(countQuery);

    return total;
  };

  getUserList = async (query: IPayloadGetUser, roleLevel: number) => {
    const { dataQuery } = await this.filterCondition(query, roleLevel);

    const result = await this.collection.aggregate<IUser>(dataQuery).toArray();

    return result;
  };

  addUser = async (user: IUser | any) => {
    const result = await this.collection.insertOne({
      ...user,

      roleId: new ObjectId(user.roleId),
      emailVerified: user.emailVerified || false,
      lastPasswordUpdate: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    });

    return result.insertedId.toHexString();
  };

  getByRoleId = async (roleId: string) => {
    const result = await this.collection
      .find<IUser>(
        {
          roleId: new ObjectId(roleId),
          deletedAt: null,
        },
        {
          projection: { id: "$_id", _id: 0, name: 1, email: 1, phoneNumber: 1 },
        }
      )
      .toArray();

    return result;
  };

  deleteUserByRoleId = async (roleId: string) => {
    return await this.collection.updateMany(
      {
        roleId: new ObjectId(roleId),
      },
      {
        $set: { deletedAt: new Date() },
      }
    );
  };

  getById = async (
    userId: string,
    projection?: { [x: string]: string | number }
  ) => {
    const query = [
      {
        $match: {
          _id: new ObjectId(userId),
          deletedAt: null,
        },
      },
      {
        $lookup: {
          from: "Roles",
          as: "role",
          let: { roleId: "$roleId" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$roleId"] },
              },
            },
            {
              $project: {
                id: "$_id",
                _id: 0,
                name: 1,
                builtIn: 1,
                description: 1,
                permissions: 1,
                level: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$role",
        },
      },
      {
        $project: projection
          ? projection
          : {
              _id: 0,
              id: "$_id",
              name: 1,
              email: 1,
              phoneNumber: 1,
              description: 1,
              workplace: 1,
              address: 1,
              role: 1,
              roleId: 1,
              mfaActive: 1,
              emailVerified: 1,
              provider: 1,
            },
      },
    ];

    const result = await this.collection.aggregate(query).toArray();

    if (result.length) {
      return result[0];
    }
    return {};
  };

  updateUser = async (userId: string, user: IUser) => {
    if (user.roleId as string) {
      user.roleId = new ObjectId(user.roleId);
    }

    return await this.collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { ...user, updatedAt: new Date() } }
    );
  };

  deleteUser = async (userId: string) => {
    // await this.collection.deleteOne({ _id: new ObjectId(userId) });
    return await this.collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { deletedAt: new Date() } }
    );
  };

  updatePassword = async (userId: string, newPassword: string) => {
    return await this.collection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          password: newPassword,
          lastPasswordUpdate: new Date(),
          updatedAt: new Date(),
        },
      }
    );
  };

  verifyEmail = async (email: string) => {
    return await this.collection.updateOne(
      { email, deletedAt: null },
      {
        $set: {
          emailVerified: true,
          updatedAt: new Date(),
        },
      }
    );
  };

  changePhoneNumber = async (userId: string, phoneNumber: string) => {
    return await this.collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { phoneNumber, updatedAt: new Date() } }
    );
  };

  getUserIdListByListRoleId = async (
    roleIdList: ObjectId[]
  ): Promise<string[]> => {
    const userList = await this.collection
      .find({ roleId: { $in: roleIdList }, deletedAt: null })
      .toArray();

    if (!userList.length) return [];

    return userList.map((user) => user._id.toHexString());
  };

  getUserListOfFilterUserLogs = async () => {
    const result = await this.collection
      .find<IUser[]>(
        {
          deletedAt: null,
        },
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
  };
}
