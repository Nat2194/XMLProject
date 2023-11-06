import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { LoginDto } from './dto';
import { Response as Res, Request as Req } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    private static cookieOption;
    login(user: LoginDto, res: Res): Promise<User>;
    refresh(req: Req, res: Res): Promise<void>;
    test(req: Req): Promise<any>;
    logout(res: Res): Promise<void>;
}
