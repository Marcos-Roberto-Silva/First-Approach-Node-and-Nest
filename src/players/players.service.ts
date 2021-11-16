import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PlayerCreateDto } from './dtos/player-create.dto';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(playerCreateDto: PlayerCreateDto): Promise<void> {
    const { email } = playerCreateDto;

    const playerFound = await this.playerModel.findOne({ email }).exec();

    if (playerFound) {
      this.update(playerCreateDto);
    } else {
      this.create(playerCreateDto);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return await this.playerModel.find().exec();
  }

  async getPlayerByEmail(email: string): Promise<Player> {
    const playerFound = this.playerModel.findOne({ email }).exec();

    if (!playerFound) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }
    return playerFound;
  }
  async deletePlayer(email: string): Promise<any> {
    return await this.playerModel.remove({ email }).exec();
  }

  private async create(playerCreateDto: PlayerCreateDto): Promise<Player> {
    const playerCreated = new this.playerModel(playerCreateDto);
    return await playerCreated.save();
  }

  private async update(playerCreateDto: PlayerCreateDto): Promise<Player> {
    return await this.playerModel
      .findOneAndUpdate(
        { email: playerCreateDto.email },
        { $set: playerCreateDto },
      )
      .exec();
  }
}
