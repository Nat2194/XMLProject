import { Entity, Property, PrimaryKey } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';

// Custom Packages
import { CreateUserDto } from './dto';

@Entity()
export class User {
  constructor(dto: CreateUserDto) {
    this.firstname = dto.firstname;
    this.lastname = dto.lastname;
    this.mail = dto.mail;
  }

  @PrimaryKey()
  userId!: number;

  @Property()
  firstname!: string;

  @Property()
  lastname!: string;

  @Property()
  mail!: string;

  @Property({ type: 'text', hidden: true })
  password?: string;

  @Property({ hidden: true, nullable: true })
  lastLogin?: number;

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  async setPassword(password: string): Promise<void> {
    this.password = await bcrypt.hash(password, 10);
  }
}
