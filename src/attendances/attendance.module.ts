import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './attendances.service';
import { Attendance } from './entities/attendance.entity';
import { AttendanceController } from './attendances.controller';
import { BookingsModule } from './../bookings/bookings.module';
import { MailModule } from './../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attendance]), BookingsModule, MailModule],
  controllers: [AttendanceController],
  providers: [AttendanceService],
  exports: [AttendanceService]
})
export class AttendanceModule {}
