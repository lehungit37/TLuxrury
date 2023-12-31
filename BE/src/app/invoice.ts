import { RoomApp } from "./room_app";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../models/util";
import store from "../stores";
import { IStatistialFilter } from "../interface/invoices";
import ExcelJs from "exceljs";
import { forEach, isEmpty, has } from "lodash";
import { ERoomStatus } from "../interface/room";

export class InvoiceApp {
  async createInvoice(data: any) {
    const roomId = data.roomId;

    if (!roomId) {
      throw new AppError(
        "invoiceApp.createInvoice",
        "RoomId không hợp lệ",
        StatusCodes.BAD_REQUEST
      );
    }

    const room = await new RoomApp().getById(roomId);

    if (room.status !== ERoomStatus.FREE) {
      throw new AppError(
        "invoiceApp.createInvoice",
        `Phòng ${room.name} hiện không rảnh, vui lòng quay lại sau`,
        StatusCodes.BAD_REQUEST
      );
    }

    await store
      .invoiceStore()
      .create(data)
      .catch((error) => {
        throw new AppError(
          "App.user.addUser",
          "Lỗi hệ thống",
          StatusCodes.INTERNAL_SERVER_ERROR,
          error.message
        );
      });
  }

  async getInvoiceByRoomId(roomId: string, paymentStatus: "paid" | "unpaid") {
    const invoice = await store
      .invoiceStore()
      .getByRoomId(roomId, paymentStatus);

    return invoice;
  }

  async createPayment(roomId: string) {
    const invoice = await this.getInvoiceByRoomId(roomId, "unpaid");
    const room = await new RoomApp().getById(roomId);
    const roomPrice = room.price;
    const roomPromotion = room.promotion;

    const amount = roomPrice - roomPromotion;

    const endDate = new Date();

    const dataUpdateInvoice = {
      endDate,
      amount,
    };

    await store.invoiceStore().update(invoice.id, dataUpdateInvoice);

    return { ...invoice, amount };
  }

  async invoicePaided(invoiceId: string) {
    await store.invoiceStore().invoicePaided(invoiceId);
  }

  async getStatistical(payload: IStatistialFilter) {
    try {
      const result = await store.invoiceStore().getStatistical(payload);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async reportStatisticalExcel(filter: IStatistialFilter) {
    let roomName = "";
    if (filter.roomId) {
      const room = await new RoomApp().getById(filter.roomId);

      roomName = room.name;
    }

    const result = await this.getStatistical(filter);

    try {
      let workbook = new ExcelJs.Workbook();
      let worksheet = workbook.addWorksheet("Báo cáo doanh thu");

      worksheet.getColumn(1).width = 10;
      worksheet.getColumn(1).alignment = {
        horizontal: "center",
        vertical: "distributed",
      };
      worksheet.getCell("A1").value = "STT";
      worksheet.getCell("A1").alignment = {
        horizontal: "center",
        vertical: "distributed",
      };

      worksheet.getColumn(2).width = 25;
      worksheet.getColumn(2).alignment = {
        horizontal: "center",
        vertical: "distributed",
      };
      worksheet.getCell("B1").value = "Thời gian";
      worksheet.getCell("B1").alignment = {
        horizontal: "center",
        vertical: "distributed",
      };

      worksheet.getColumn(3).width = 30;
      worksheet.getColumn(3).alignment = {
        horizontal: "center",
        vertical: "distributed",
      };
      worksheet.getCell("C1").value = "Phòng";
      worksheet.getCell("C1").alignment = {
        horizontal: "center",
        vertical: "distributed",
      };

      worksheet.getColumn(4).width = 20;
      worksheet.getColumn(4).alignment = {
        horizontal: "center",
        vertical: "distributed",
      };
      worksheet.getCell("D1").value = "Doanh thu";
      worksheet.getCell("D1").alignment = {
        horizontal: "center",
        vertical: "distributed",
      };

      let order = 1;
      forEach(result, (item) => {
        let row = [order, item.id, roomName, item.totalAmount];

        console.log(row);

        worksheet.addRow(row);
        order++;
      });

      return workbook;
    } catch (error: any) {
      throw new AppError(
        `reportStatisticalExcel()`,
        "Xuất báo cáo thống kê thất bại",
        StatusCodes.INTERNAL_SERVER_ERROR,
        error
      );
    }
  }
}
