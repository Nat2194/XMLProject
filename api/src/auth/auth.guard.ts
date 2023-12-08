import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';

// Custom Packages
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    request.user = await this.verifyToken(context, request);
    return request.user !== null;
  }

  private async verifyToken(context, request): Promise<User> {
    const token = request?.signedCookies?.accessToken;
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    if (
      !(await this.jwtService.verifyAsync(
        token,
        this.authService.getOptions('access'),
      ))
    ) {
      throw new UnauthorizedException('Token is invalid');
    }
    const payload = this.jwtService.decode(token) as { [key: string]: any };

    if (!payload) {
      throw new UnauthorizedException('Token is invalid');
    }

    const user = await this.userService.findOne(payload.sub);
    if (user.lastLogin !== payload.iat) {
      throw new UnauthorizedException('User already logged in');
    }
    return user;
  }
}
