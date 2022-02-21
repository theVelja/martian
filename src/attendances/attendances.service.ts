import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingService } from './../bookings/bookings.service';
import { MailService } from './../mail/mail.service';
import { Repository } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Attendance } from './entities/attendance.entity';
import { v4 as uuidv4 } from 'uuid';
import { PostgresErrorCode } from './../common/postgresErrorCodeEnum';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>,
    private bookingService: BookingService,
    private mailingService: MailService
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<Attendance | void> {
    const booking = await this.bookingService.findById(createAttendanceDto.bookingId);
    if (!booking) throw new NotFoundException(`Booking with the id: ${createAttendanceDto.bookingId} not found`);

    const attendance = new Attendance();
    attendance.email = createAttendanceDto.email;
    attendance.firstName = createAttendanceDto.firstName;
    attendance.lastName = createAttendanceDto.lastName;
    attendance.phone = createAttendanceDto.phone;
    attendance.booking = booking;
    attendance.confirmationCode = uuidv4();
    const result = this.attendanceRepository.save(attendance).catch(err => {
      if (err.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException(`You have allready signed up for "${booking.name}"`)
      }
    });
    this.mailingService.sendUserConfirmation(createAttendanceDto.email, booking.name, attendance.confirmationCode)
    return result;
  }

  async findAll(): Promise<Array<Attendance>> {
      return this.attendanceRepository.find();
  }
}
