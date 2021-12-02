import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { CategoryUpdateDTO } from './dto/categoryUpdateDTO.dto';
import { CreateCategoryDTO } from './dto/create-category.dto';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    const { category } = createCategoryDTO;
    console.log('category: ', category);

    const categoryFound = await this.categoryModel.findOne({ category }).exec();

    console.log('categoryFound: ', categoryFound);

    if (categoryFound) {
      throw new BadRequestException(`Category ${category} already exists.`);
    }

    const categoryCreated = new this.categoryModel(createCategoryDTO);
    return await categoryCreated.save();
  }

  async getAllCategories(): Promise<Array<Category>> {
    return await this.categoryModel.find().populate('players').exec();
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

  async addPlayerCategory(params: string[]): Promise<{ message: string }> {
    const category = params['category'];
    const idPlayer = params['idPlayer'];

    const categoryFound = await this.categoryModel.findOne({ category }).exec();
    const playerAlreadyAdded = await this.categoryModel
      .find({ category })
      .where('players')
      .in(idPlayer)
      .exec();

    if (!playerAlreadyAdded) {
      throw new BadRequestException(`Category ${category} not registered`);
    }

    const player = await this.playersService.getPlayerById(idPlayer);

    console.log('player: ', player);

    if (!player) {
      throw new BadRequestException(
        `Player with id ${idPlayer} was not registered.`,
      );
    }

    if (!categoryFound) {
      throw new BadRequestException(`Category ${category} not found`);
    }

    categoryFound.players.push(idPlayer);
    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: categoryFound })
      .exec();

    return { message: 'Player was saved successfully.' };
  }
}
