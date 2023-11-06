import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
export declare class AuthGuard implements CanActivate {
    private readonly userService;
    private readonly authService;
    private readonly jwtService;
    private reflector;
    constructor(userService: UserService, authService: AuthService, jwtService: JwtService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private verifyToken;
}
