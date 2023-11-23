import { IRouter, NextFunction, Request, Response } from "express";
import moment from "moment";
import { InvoiceApp } from "../../app/invoice";

export const invoiceRouter = (router: IRouter) => {
  router.get("/invoices/create_payment/:roomId", createPayment);
  router.get("/invoices/statistical", getStatistical);
  router.post("/invoices/statistical/exportReport", reportStatisticalExcel);
  router.post("/invoices", createInvoice);

  router.put("/invoices/:invoiceId/paided", invoicePaided);
};

const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    await new InvoiceApp().createInvoice(data);

    res.json("OK");
  } catch (error) {
    next(error);
  }
};

const createPayment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roomId = req.params.roomId;

    const data = await new InvoiceApp().createPayment(roomId);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

const invoicePaided = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const invoiceId = req.params.invoiceId;

    await new InvoiceApp().invoicePaided(invoiceId);

    res.json("OK");
  } catch (error) {
    next(error);
  }
};

const getStatistical = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.query;

    console.log(payload);

    const result = await new InvoiceApp().getStatistical({
      startDate: new Date(payload.startDate as string),
      endDate: new Date(payload.endDate as string),
      roomId: (payload.roomId as string) || "",
      timeType: (payload.timeType as any) || "day",
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};
const reportStatisticalExcel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;

    const workbook: any = await new InvoiceApp().reportStatisticalExcel(
      payload
    );

    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      `Bao_cao_doanh_thu_${moment(payload.startDate).format(
        "DD/MM/yyyy"
      )}_${moment(payload.endDate).format("DD/MM/yyyy")}.xlsx`
    );

    workbook.xlsx.write(res).then(() => {
      res.status(200).end();
    });
  } catch (error) {
    next(error);
  }
};
