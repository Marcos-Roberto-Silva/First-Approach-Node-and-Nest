import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './interfaces/category.interface';
import { CategoriesService } from './categories.service';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async categoryCreate(
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    return await this.categoriesService.createCategory(createCategoryDTO);
  }
}
