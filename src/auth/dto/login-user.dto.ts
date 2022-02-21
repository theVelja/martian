import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
    @ApiProperty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}