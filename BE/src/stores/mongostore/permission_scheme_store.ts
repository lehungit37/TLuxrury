import { Db } from "mongodb";
import { IPermissionSchemes } from "../../interface/permissionScheme";
import { BaseStore } from "./base_store";
export class PermissionSchemes extends BaseStore {
  constructor(db: Db) {
    super(db, "PermissionSchemes");
  }

  getByRoleLevel = async (roleLevel: number) => {
    const project = {
      $project: {
        id: 1,
        _id: 0,
        name: 1,
        description: 1,
        required: 1,
        permissions: {
          $filter: {
            input: "$permissions",
            as: "permission",
            cond: {
              $gte: [
                "$$permission.privateLevel",
                roleLevel === 0 ? 1 : roleLevel,
              ],
            },
          },
        },
      },
    };

    const match = {
      $match: {
        permissions: {
          $ne: [],
        },
      },
    };

    const result = await this.collection
      .aggregate<IPermissionSchemes>([project, match])
      .toArray();

    return result;
  };

  getRouteList = async (permissions: string[], isGetAll?: boolean) => {
    const project = {
      _id: 0,
      id: 1,
      name: 1,
    };

    let result: any;
    if (isGetAll) {
      result = await this.collection
        .find<IPermissionSchemes>({}, { projection: project })
        .toArray();
    } else
      result = await this.collection
        .find<IPermissionSchemes>(
          {
            $or: [
              {
                permissions: {
                  $elemMatch: {
                    id: {
                      $in: permissions,
                    },
                  },
                },
              },
              {
                required: true,
              },
            ],
          },
          { projection: project }
        )
        .toArray();

    return result;
  };
}
