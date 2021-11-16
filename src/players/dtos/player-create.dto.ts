import { IsNotEmpty, IsEmail } from 'class-validator';
export class PlayerCreateDto {
  @IsNotEmpty()
  readonly phoneNumber: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly name: string;
}
