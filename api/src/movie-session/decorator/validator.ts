import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { NotAcceptableException } from '@nestjs/common';

// Custom Packages
import { MovieSession } from '../movie-session.entity';

export function IsMovieSession(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsMovieSession',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          let verif = true;
          if (!(value instanceof MovieSession)) {
            verif = false;
            throw new NotAcceptableException('Not a MovieSession object');
          }
          return verif;
        },
      },
    });
  };
}

export function IsDateWithTime(validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isDateWithTime',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (!(value instanceof Date)) {
            return false; // Not a Date object
          }
          const timeRegex = /^(\d{2}:\d{2}:\d{2})$/; // HH:mm:ss format
          return timeRegex.test(value.toTimeString().split(' ')[0]);
        },
      },
    });
  };
}
