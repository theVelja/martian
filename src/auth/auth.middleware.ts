import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwtService: JwtService){};

    use(req: Request, res: Response, next: NextFunction): void {
        const {authorization} = req.headers;
        if (
            !authorization || 
            authorization.split('Bearer').length !== 2
        )
            throw new UnauthorizedException("Bearer token missing");
        try {
            this.jwtService.verify(authorization.split('Bearer')[1].trim())
        } catch(e) {
            throw new UnauthorizedException("Invalid token signature");
        }
        // should be extended with additional check to verify the user itself based on the id stored in the token
        // potentialy extend the user table with the token field in order to invalidate old tokens
        next();
    }
}