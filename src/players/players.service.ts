import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PlayerCreateDto } from './dtos/player-create.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { playerNotFound } from '../utils/playerNotFound';
import { Model } from 'mongoose';
import { PlayerUpdateDto } from './dtos/player-update.dto';
@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async playerCreate(playerCreateDto: PlayerCreateDto): Promise<Player> {
    const { email } = playerCreateDto;

    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      throw new BadRequestException(
        `Player with email ${email} alredy registered`,
      );
    }
    const playerCreated = new this.playerModel(playerCreateDto);
    return await playerCreated.save();
  }

  async playerUpdate(
    _id: string,
    playerUpdateDto: PlayerUpdateDto,
  ): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new BadRequestException(playerNotFound(_id));
    }

    const updatedPlayer = await this.playerModel
      .findOneAndUpdate({ _id }, { $set: playerUpdateDto })
      .exec();

    return updatedPlayer;
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayerById(_id: string): Promise<Player> {
    const playerFound = this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(playerNotFound(_id));
    }
    return playerFound;
  }

  async deletePlayer(_id: string): Promise<{ message: string }> {
    const playerFound = this.playerModel.findOne({ _id }).exec();

    if (!playerFound) {
      throw new NotFoundException(playerNotFound(_id));
    }

    await this.playerModel.deleteOne({ _id }).exec();
    return { message: `Player with id ${_id} deleted` };
  }
}
