import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import { SuccessfullLoginDto } from './dto/successfull-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ){}

    async login(loginUserDto: LoginUserDto): Promise<SuccessfullLoginDto> {
        const {email, password} = loginUserDto;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new NotFoundException(`User with the given parameteres not found`);
        }
        if (!await this.doPasswordsMatch(password, user.password)) {
            throw new NotFoundException(`User with the given parameteres not found`);
        }
        return {
            access_token: this.jwtService.sign({_id: user.id})
        };
    }

    public async doPasswordsMatch(unhashedPassword:string, hashedPassword:string):Promise<boolean> {
        return bcrypt.compare(unhashedPassword, hashedPassword);
    }
}
