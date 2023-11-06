import { EntityRepository } from '@mikro-orm/postgresql';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: EntityRepository<User>);
    createUser(dto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(userId: number): Promise<User>;
    update(userId: number, dto: UpdateUserDto): Promise<User>;
    delete(userId: number): Promise<void>;
    findByMail(mail: string): Promise<User>;
}
