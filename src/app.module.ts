import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsController } from './bookings/bookings.controller';
import { BookingsModule } from './bookings/bookings.module';
import { AttendanceController } from './attendances/attendances.controller';
import { AttendanceModule } from './attendances/attendance.module';
import { MailModule } from './mail/mail.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    BookingsModule,
    AttendanceModule,
    TypeOrmModule.forRoot(),
    MailModule
  ],
  controllers: [AuthController, BookingsController, AttendanceController],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude({path: 'booking', method: RequestMethod.GET})
      .forRoutes(BookingsController);
  }
}