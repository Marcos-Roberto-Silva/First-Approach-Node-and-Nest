import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './interfaces/category.interface';
import { CategoriesService } from './categories.service';
import { CategoryUpdateDTO } from './dto/categoryUpdateDTO.dto';

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

  @Get()
  async getCategory(): Promise<Array<Category>> {
    return await this.categoriesService.getAllCategories();
  }

  @Get('/:category')
  async getCategoryById(
    @Param('category') category: string,
  ): Promise<Category> {
    return await this.categoriesService.getCategoryById(category);
  }

  @Put('/:category')
  async categoryUpdate(
    @Body() categoryUpdateDTO: CategoryUpdateDTO,
    @Param('category') category: string,
  ): Promise<void> {
    await this.categoriesService.categoryUpdate(category, categoryUpdateDTO);
  }

  @Post('/:category')
  async addCategoryPlayer()
}
