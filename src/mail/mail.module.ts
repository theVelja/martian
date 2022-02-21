import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        },
        port: 2525
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      }
    }),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}