import { Module } from '@nestjs/common';
import { BookingService } from './bookings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { BookingsController } from './bookings.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Booking])],
  controllers: [BookingsController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingsModule {}
