import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { SuccessfullLoginDto } from './dto/successfull-login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {};

    @ApiOperation({summary: "Authenticating the user and returning access_token"})
    @ApiOkResponse({description: 'Login has been successfull', type: SuccessfullLoginDto})
    @ApiNotFoundResponse({description: 'User with the given credentials not found'})
    @HttpCode(200)
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<SuccessfullLoginDto> {
        return this.authService.login(loginUserDto);
    }
}