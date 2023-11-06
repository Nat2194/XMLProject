import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    create(user: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(userId: number): Promise<User>;
    update(userId: number, user: UpdateUserDto): Promise<User>;
    delete(userId: number): Promise<void>;
}
