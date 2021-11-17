import { BadRequestException, PipeTransform } from '@nestjs/common';

export class PlyersValidatorParameter implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException("Please inform the player's email");
    } else {
      return value;
    }
  }
}
