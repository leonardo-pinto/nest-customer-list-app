import { BadRequestException, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

export class ValidateIdPipe implements PipeTransform {
  transform(id: any) {
    if (!isValidObjectId(id)) throw new BadRequestException('Wrong id format');
    return id;
  }
}
