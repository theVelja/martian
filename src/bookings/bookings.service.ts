import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostgresErrorCode } from './../common/postgresErrorCodeEnum';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async findAll(): Promise<Array<Booking>> {
    return this.bookingRepository.find();
  }

  async findById(id: number): Promise<Booking> {
    return this.bookingRepository.findOne({id});
  }

  async create(createBookingDto: CreateBookingDto): Promise<Booking | void> {
    return this.bookingRepository.save(createBookingDto).catch(e => {
      if (e.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException(`Booking with the name "${createBookingDto.name}" already existsss`)
      }
    });
  }

  async delete(id: string): Promise<any> {
    return this.bookingRepository.delete(id);
  }
}
