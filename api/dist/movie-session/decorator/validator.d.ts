import { ValidationOptions } from 'class-validator';
export declare function IsMovieSession(validationOptions?: ValidationOptions): (object: any, propertyName: string) => void;
export declare function IsDateWithTime(validationOptions?: ValidationOptions): (object: Record<string, any>, propertyName: string) => void;
