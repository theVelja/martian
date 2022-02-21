import { IsString, IsNotEmpty, IsEmail, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAttendanceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly lastName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly phone: string;

    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsInt()
    readonly bookingId: number;
}