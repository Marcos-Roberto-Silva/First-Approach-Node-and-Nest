import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PlayerCreateDto } from './dtos/player-create.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);

  async createUpdatePlayer(playerCreateDto: PlayerCreateDto): Promise<void> {
    const { email } = playerCreateDto;

    const playerFound = this.players.find(
      (player) => player.email === email,
    );

    if (playerFound) {
      this.update(playerFound, playerCreateDto);
    } else {
      this.create(playerCreateDto);
    }
  }

  async getAllPlayers(): Promise<Player[]> {
    return this.players;
  }

  async getPlayerByEmail(email: string): Promise<Player> {
     const playerFound = this.players.find((player) => player.email === email);

     if (!playerFound) {
        throw new NotFoundException(`Player with email ${email} not found`);
     }
        return playerFound;
  }
  async deletePlayer(email: string): Promise<void> {
    const playerFound =  this.players.find((player) => player.email === email);

    this.players = this.players.filter((player) => player.email !== playerFound.email);
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

  private update(playerFound: Player, playerCreateDto: PlayerCreateDto): void {
    const { name } = playerCreateDto;

    playerFound.name = name;
  }
}
