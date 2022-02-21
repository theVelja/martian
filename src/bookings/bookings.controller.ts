import { Controller, Post, Body, Get, Delete, Param, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookingService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './entities/booking.entity';

@ApiTags('booking(conference)')
@Controller('booking')
export class BookingsController {
    constructor(private bookingService: BookingService) {};

    @ApiOperation({summary: "Returns a list of all existsing bookings"})
    @ApiOkResponse({description: 'Returns the list of all bookings', type: Booking, isArray: true})
    @HttpCode(200)
    @Get()
    async findAll(): Promise<Array<Booking>> {
        return this.bookingService.findAll();
    }

    @ApiBearerAuth()
    @ApiOperation({summary: "Creates a new booking"})
    @ApiCreatedResponse({description: 'Creates a new booking', type: Booking})
    @HttpCode(201)
    @Post()
    async login(@Body() createBookingDto: CreateBookingDto): Promise<Booking | void> {
        return this.bookingService.create(createBookingDto);
    }

    @ApiBearerAuth()
    @ApiOperation({summary: "Deletes booking based on booking id"})
    @ApiOkResponse({description: 'Deletes the booking with the given id'})
    @HttpCode(200)
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<any> {
        return this.bookingService.delete(id);
    }
}