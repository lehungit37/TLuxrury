import nodemailer from "nodemailer";

export class Mailer {
  transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fastroomdanang@gmail.com",
        pass: "dvjp dvmb lluv blyw",
      },
    });
  }

  async sendMessage(receivers: string, subject: string, htmlBody: string) {
    await this.transporter
      .sendMail({
        from: `"TLuxury" <fastroomdanang@gmail.com>`,
        to: receivers,
        subject: subject,
        html: htmlBody,
      })
      .then((info: any) => {
        console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
      })
      .catch((error: any) => {
        console.log(error);
      });
  }
}
