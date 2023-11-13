// parse-date.pipe.ts

import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string, metadata: ArgumentMetadata): Date {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    return date;
  }
}
