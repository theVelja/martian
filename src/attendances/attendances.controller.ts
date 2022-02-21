import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AttendanceService } from './attendances.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { Attendance } from './entities/attendance.entity';

@ApiTags('attendance')
@Controller('attendance')
export class AttendanceController {
    constructor(private attendanceService: AttendanceService) {};

    @ApiOperation({summary: "Creates new attendance"})
    @ApiCreatedResponse({description: 'Creates an attendance', type: Attendance})
    @ApiNotFoundResponse({description: 'When booking with the given id doesnt exist'})
    @ApiBadRequestResponse({description: 'User with the given email already signed up for the conference'})
    @HttpCode(201)
    @Post()
    async create(@Body() createAttendanceDto: CreateAttendanceDto): Promise<Attendance | void> {
        return this.attendanceService.create(createAttendanceDto);
    }
}