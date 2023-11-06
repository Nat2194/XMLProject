import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsDate,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  readonly mail?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  readonly firstname?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsOptional()
  readonly lastname?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @IsOptional()
  readonly password?: string;

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  readonly lastLogin?: number;
}
