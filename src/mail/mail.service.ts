import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(email: string, eventName: string, confirmationCode: string): Promise<void> {
    this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to Nice App! Confirm your Email',
        text: `You have successfully registerd for ${eventName}. Your invitation code is ${confirmationCode}`,
        html: `<h1>You have successfully registerd for ${eventName}.</h1> <p>Your invitation code is <b>${confirmationCode}</b></p>`,
    });
  }
}
