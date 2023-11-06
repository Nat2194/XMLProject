import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly mail: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password?: string;
}
