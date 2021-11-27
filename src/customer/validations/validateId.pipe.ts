import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export class ValidateIdPipe implements PipeTransform {
  transform(value: any) {
    if (!isValidObjectId(value))
      throw new BadRequestException('Wrong id format');
    return value;
  }
}
