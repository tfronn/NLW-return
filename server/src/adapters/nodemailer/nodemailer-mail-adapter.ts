import { MailAdapter, SendMailData } from "../mail-adapter"
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6811c6b74f1e37",
    pass: "9e78c8620b1571"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe FeedGet <oi@feedget.com>',
      to: 'Kelvin Camilo <keeelvincamilo@hotmail.com>',
      subject,
      html: body,
    })
  };
}