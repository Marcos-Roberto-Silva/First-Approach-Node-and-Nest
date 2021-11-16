import { NotFoundException, PipeTransform } from '@nestjs/common';

export class PlyersValidatorParameter implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new NotFoundException(
        'Please inform the player email for deletion.',
      );
    } else {
      return value;
    }
  }
}
