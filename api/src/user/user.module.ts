import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';

// Custom Packages
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';
import { config } from '../shared/configs/config';
import { CreateUserDto } from './dto';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User] })],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}
  public async onModuleInit(): Promise<void> {
    if ((await this.userRepository.count()) === 0) {
      const adminUser = new User({
        firstname: config.get('admin.firstname'),
        lastname: config.get('admin.lastname'),
        mail: config.get('admin.mail'),
      } as CreateUserDto);
      await adminUser.setPassword(config.get('admin.password'));
      await this.userRepository.persistAndFlush(adminUser);
    }
  }
}
