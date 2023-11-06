import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { LoginDto } from './dto';
import { UserService } from '../user/user.service';
import { IResponseToken, IAccessToken } from './interface';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(user: User): Promise<IResponseToken>;
    validateUser(dto: LoginDto): Promise<User>;
    private sign;
    getOptions(type: 'access' | 'refresh'): any;
    refresh(refreshToken: string): Promise<IAccessToken>;
}
