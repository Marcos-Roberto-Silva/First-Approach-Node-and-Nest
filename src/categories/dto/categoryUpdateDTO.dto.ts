import { IsOptional, IsString } from 'class-validator';
// import { Event } from "../interfaces/category.interface";

export class CategoryUpdateDTO {
  @IsString()
  @IsOptional()
  description: string;

  events: Array<Event>;
}
