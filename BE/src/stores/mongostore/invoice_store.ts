import { isEmpty } from "lodash";
import moment from "moment";
import { Db, ObjectId } from "mongodb";
import { IStatistialFilter } from "../../interface/invoices";
import { BaseStore } from "./base_store";

export class InvoiceStore extends BaseStore {
  constructor(db: Db) {
    super(db, "Invoices");
  }

  async create(data: any) {
    await this.collection.insertOne({
      ...data,
      roomId: new ObjectId(data.roomId),
      startDate: new Date(),
      endDate: null,
      amount: 0,
      paymentStatus: "unpaid",
    });

    return;
  }

  async getByRoomId(roomId: string, paymentStatus: "paid" | "unpaid") {
    const result = await this.collection.findOne<any>(
      {
        roomId: new ObjectId(roomId),
        paymentStatus,
      },
      {
        projection: {
          _id: 0,
          id: "$_id",
          customerName: 1,
          customerPhone: 1,
          startDate: 1,
          endDate: 1,
          roomId: 1,
          amount: 1,
          paymentStatus: 1,
        },
      }
    );

    return result;
  }

  async update(invoiceId: string, data: any) {
    await this.collection.updateOne(
      { _id: new ObjectId(invoiceId) },
      {
        $set: {
          ...data,
        },
      }
    );
  }

  async invoicePaided(invoiceId: string) {
    await this.collection.updateOne(
      { _id: new ObjectId(invoiceId) },
      {
        $set: {
          timePaymented: new Date(),
          paymentStatus: "paid",
        },
      }
    );
  }
  getStatistical = async (filter: IStatistialFilter) => {
    const { startDate, endDate, roomId, timeType } = filter;

    const dateArr = getDates(new Date(startDate), new Date(endDate), timeType);

    const mainCondition = {
      timePaymented: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
      paymentStatus: {
        $eq: "paid",
      },
    };

    let roomCondition: any = {};

    if (roomId) {
      roomCondition["roomId"] = new ObjectId(roomId);
    }

    const match = {
      $match: {
        $and: [mainCondition, roomCondition],
      },
    };

    const group = {
      $group: {
        _id: {
          $dateToString: {
            format: "%d-%m-%Y",
            date: "$timePaymented",
            timezone: "Asia/Ho_Chi_Minh",
          },
        },
        totalAmount: { $sum: "$amount" },
      },
    };

    const sort = { $sort: { _id: -1 } };

    const project = {
      $project: {
        _id: 0,
        id: "$_id",
        totalAmount: 1,
      },
    };

    const projectMap = {
      $project: {
        stats: {
          $map: {
            input: dateArr,
            as: "time",
            in: {
              $let: {
                vars: {
                  dateIndex: { $indexOfArray: ["$stats._id", "$$time"] },
                },
                in: {
                  $cond: {
                    if: { $ne: ["$$dateIndex", -1] },
                    then: {
                      $arrayElemAt: ["$stats", "$$dateIndex"],
                    },
                    else: {
                      _id: "$$time",
                      total: 0,
                      finishReport: 0,
                      finishPenal: 0,
                    },
                  },
                },
              },
            },
          },
        },
      },
    };

    const newGroup = {
      $group: {
        _id: null,
        stats: { $push: "$$ROOT" },
      },
    };

    const unwind = { $unwind: "$stats" };
    const replaceRoot = { $replaceRoot: { newRoot: "$stats" } };

    const result = await this.collection
      .aggregate<any[]>([
        match,
        group,
        sort,
        newGroup,
        projectMap,
        unwind,
        replaceRoot,
        project,
      ])
      .toArray();

    if (!result.length) {
      const newResult: any[] = [];
      dateArr.map((date) => {
        newResult.push({
          id: date,
          totalAmount: 0,
        });
      });

      return newResult;
    }

    return result;
  };
}

function getDates(
  startDate: Date,
  endDate: Date,
  type: "day" | "week" | "month" | "year"
): string[] {
  let dateArray = [];
  let currentDate = moment(startDate).utcOffset(-420).format();
  let stopDate = moment(endDate).utcOffset(-420).format();

  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate).format("DD-MM-YYYY"));
    currentDate = moment(currentDate).add(1, type).utcOffset(-420).format();
  }

  return dateArray;
}
