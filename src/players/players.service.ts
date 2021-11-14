import { Injectable, Logger } from '@nestjs/common';
import { PlayerCreateDto } from './dtos/player-create.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(playerCreateDto: PlayerCreateDto): Promise<void> {
    this.create(playerCreateDto);
  }

  private create(playerCreateDto: PlayerCreateDto): void {
    const { phoneNumber, name, email } = playerCreateDto;

    const playerCreated: Player = {
      _id: uuid(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      positionRanking: 1,
      urlPlayerPicture: 'www.google.com.br/foto123.jpg',
    };

    this.players.push(playerCreated);
    this.logger.log(`createUpdatePlayer: ${JSON.stringify(playerCreated)}`);
  }
}
