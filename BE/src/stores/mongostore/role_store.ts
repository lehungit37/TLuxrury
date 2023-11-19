import { ERoleLevel } from "./../../interface/enum";
import { IPayloadGetRole, IRole } from "./../../interface/role";
import { Db, ObjectId } from "mongodb";
import { BaseStore } from "./base_store";
import _ from "lodash";
export class RoleStore extends BaseStore {
  constructor(db: Db) {
    super(db, "Roles");
  }

  checkExitsRoleByName = async (
    name: string
  ): Promise<{ exist: boolean; id: string }> => {
    const result = await this.collection.findOne<any>(
      { name },
      { projection: { _id: 0, id: "$_id" } }
    );

    if (_.isEmpty(result)) return { exist: false, id: "" };

    return { exist: true, id: result?.id || "" };
  };

  filterCondition = (query: IPayloadGetRole, roleLevel: number) => {
    const { keyword } = query;

    const fieldSearch = ["name", "description"];

    const conditionKeywordList = fieldSearch.map((field) => {
      return { [field]: { $regex: `.*${keyword}.*`, $options: "i" } };
    });

    const keywordCondition = keyword
      ? {
          $or: conditionKeywordList,
        }
      : {};

    const roleLevelCondition = {
      level: {
        $gte: roleLevel,
      },
    };

    const match = {
      $match: {
        $and: [keywordCondition, roleLevelCondition, { deletedAt: null }],
      },
    };

    const limit = query.limit || 15;
    const skip = (query.page - 1) * limit;

    const lookup = {
      $lookup: {
        from: "Users",
        let: { id: "$_id" },
        as: "users",
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$$id", "$roleId"] },
              deletedAt: null,
            },
          },
        ],
      },
    };

    const project = {
      _id: 0,
      id: "$_id",
      name: 1,
      builtIn: 1,
      description: 1,
      permissions: 1,
      level: 1,
      totalUser: {
        $size: "$users",
      },
    };

    const dataQuery = [
      {
        $sort: {
          level: 1,
          createdAt: -1,
        },
      },
      lookup,
      match,
      { $project: project },
      { $skip: skip },
      { $limit: limit },
    ];

    return { countQuery: [match], dataQuery };
  };

  countRoleList = async (
    query: IPayloadGetRole,
    roleLevel: number
  ): Promise<number> => {
    const { countQuery } = this.filterCondition(query, roleLevel);

    const total = this.count(countQuery);

    return total;
  };

  getListRole = async (query: IPayloadGetRole, roleLevel: number) => {
    const { dataQuery } = this.filterCondition(query, roleLevel);

    const result = await this.collection.aggregate<IRole>(dataQuery).toArray();

    return result;
  };

  addRole = async (role: IRole) => {
    const result = await this.collection.insertOne(role);

    const roleId = result.insertedId.toString();

    return roleId;
  };

  getById = async (id: string) => {
    const result = await this.collection.findOne<IRole>(
      { _id: new ObjectId(id), deletedAt: null },
      {
        projection: {
          _id: 0,
          id: "$_id",
          name: 1,
          description: 1,
          permissions: 1,
          builtIn: 1,
          level: 1,
        },
      }
    );

    return result;
  };

  deleteRole = async (id: string) => {
    return await this.collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          deletedAt: new Date(),
          updatedAt: new Date(),
        },
      }
    );
  };

  updateRole = async (roleId: string, newRole: IRole) => {
    return await this.collection.updateOne(
      { _id: new ObjectId(roleId), deletedAt: null },
      {
        $set: { ...newRole, updatedAt: new Date() },
      }
    );
  };

  getRoleByLevel = async (roleLevel: number) => {
    const result = await this.collection
      .find<IRole>(
        {
          level: {
            $gte: roleLevel,
          },
          deletedAt: null,
        },
        {
          projection: {
            _id: 0,
            id: "$_id",
            name: 1,
            description: 1,
            permissions: 1,
            builtIn: 1,
            level: 1,
          },
        }
      )
      .sort({ level: 1 })
      .toArray();

    return result;
  };

  getRoleIdListOfAdminRole = async (): Promise<ObjectId[]> => {
    const roleList = await this.collection
      .find({
        level: { $in: [ERoleLevel.SUPER_ADMIN, ERoleLevel.ADMIN] },
      })
      .toArray();

    if (!roleList.length) return [];

    return roleList.map((role) => role._id);
  };

  getListUserIdByPermission = async (
    permissionName: string
  ): Promise<string[]> => {
    const queryCondition = [
      {
        $match: {
          permissions: {
            $eq: permissionName,
          },
          deletedAt: null,
        },
      },
      {
        $lookup: {
          from: "Users",
          let: { id: "$_id" },
          as: "users",
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$roleId", "$$id"] },
                deletedAt: null,
              },
            },
          ],
        },
      },
    ];
    const result = await this.collection.aggregate(queryCondition).toArray();
    const userIdList: string[] = [];

    for (const itemResult of result) {
      if (itemResult.users && itemResult.users.length) {
        const users = itemResult.users;
        users.map((user: any) => {
          userIdList.push(user._id.toHexString());
        });
      }
    }

    return userIdList;
  };
}
