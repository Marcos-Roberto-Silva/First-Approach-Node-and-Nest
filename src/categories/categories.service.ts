import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryUpdateDTO } from './dto/categoryUpdateDTO.dto';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    const { category } = createCategoryDTO;

    const categoryFound = await this.categoryModel.findOne({ category }).exec();

    if (categoryFound) {
      throw new BadRequestException(`Category ${category} already exists.`);
    }
    const categoryCreated = new this.categoryModel(createCategoryDTO);
    return await categoryCreated.save();
  }

  async getAllCategories(): Promise<Array<Category>> {
    return await this.categoryModel.find().exec();
  }

  async getCategoryById(category: string): Promise<Category> {
    const categoryFound = await this.categoryModel.findOne({ category }).exec();

    if (!categoryFound) {
      throw new NotFoundException(`Category ${category} not found`);
    }

    return categoryFound;
  }

  async categoryUpdate(
    category: string,
    categoryUpdateDTO: CategoryUpdateDTO,
  ): Promise<void> {
    const categoryFound = await this.categoryModel.findOne({ category }).exec();

    if (!categoryFound) {
      throw new NotFoundException(`Category ${category} does not exist`);
    }

    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: categoryUpdateDTO })
      .exec();
  }
}
