import { OnModuleInit } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { User } from './user.entity';
export declare class UserModule implements OnModuleInit {
    private readonly userRepository;
    constructor(userRepository: EntityRepository<User>);
    onModuleInit(): Promise<void>;
}
