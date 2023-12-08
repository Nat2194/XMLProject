import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  Injectable,
  ConflictException,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common';
import { wrap } from '@mikro-orm/core';

// Custom Packages
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<User> {
    if (await this.userRepository.findOne({ mail: dto.mail })) {
      throw new ConflictException('Email already used');
    }
    const user = new User(dto);
    await user.setPassword(dto.password);
    await this.userRepository.persistAndFlush(user);
    return user;
  }

  public async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async findOne(userId: number): Promise<User> {
    return await this.userRepository.findOneOrFail({
      userId,
    });
  }

  public async searchUsersByCriteria(criteria: any): Promise<User[]> {
    const query = {
      mail: null,
      firstname: null,
      lastname: null,
    };
    console.log('service');
    try {
      if (!criteria.mail) {
        delete query.mail;
      } else {
        query.mail = { $ilike: `${criteria.mail}%` };
      }
      if (!criteria.firstname) {
        delete query.firstname;
      } else {
        query.firstname = { $ilike: `${criteria.firstname}%` };
      }
      if (!criteria.lastname) {
        delete query.lastname;
      } else {
        query.lastname = { $ilike: `${criteria.lastname}%` };
      }
      console.log(query);
      return await this.userRepository.find(query);
    } catch (error) {
      throw new NotFoundException('User not found for the provided criteria');
    }
  }

  public async update(userId: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneOrFail({
      userId,
    });
    wrap(user).assign(dto);
    if (typeof dto.password !== 'undefined') {
      await user.setPassword(dto.password);
    }
    await this.userRepository.flush();
    return user;
  }

  public async delete(userId: number): Promise<HttpStatus> {
    try {
      await this.userRepository.removeAndFlush(
        await this.userRepository.findOneOrFail({
          userId,
        }),
      );
      return HttpStatus.NO_CONTENT; // Suppression réussie
    } catch (error) {
      throw error;
    }
  }

  public async findByMail(mail: string): Promise<User> {
    return await this.userRepository.findOne({ mail });
  }
}
