import nodemailer from 'nodemailer';
import { htmlToText } from 'html-to-text';

export class Email {
  private from: string;
  private to: string;

  constructor(private subject: string, private template: string) {
    this.from = process.env.EMAIL_FROM as string;
    this.to = process.env.EMAIL_TO as string;
  }

  private createTransport() {
    return nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      auth: {
        user: process.env.SEND_IN_BLUE_USERNAME,
        pass: process.env.SEND_IN_BLUE_PASSWORD,
      },
    });
  }

  public async send(): Promise<void> {
    const transporter = this.createTransport();
    await transporter.sendMail({
      from: this.from,
      to: this.to,
      subject: this.subject,
      html: this.template,
      text: htmlToText(this.template),
    });
  }
}
