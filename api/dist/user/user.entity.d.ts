import { CreateUserDto } from './dto';
export declare class User {
    constructor(dto: CreateUserDto);
    userId: number;
    firstname: string;
    lastname: string;
    mail: string;
    password?: string;
    lastLogin?: number;
    comparePassword(password: string): Promise<boolean>;
    setPassword(password: string): Promise<void>;
}
