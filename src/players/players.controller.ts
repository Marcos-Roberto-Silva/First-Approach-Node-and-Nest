import { Body, Controller, Get, Post } from '@nestjs/common';
import { PlayerCreateDto } from './dtos/player-create.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post() async createUpdatePlayer(@Body() playerCreateDto: PlayerCreateDto) {
    await this.playersService.createUpdatePlayer(playerCreateDto);
  }

  @Get() async getPlayers(): Promise<Player[]> {
    return this.playersService.getAllPlayers();
  }
}
