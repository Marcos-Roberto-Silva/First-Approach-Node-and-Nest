import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { PlayerCreateDto } from './dtos/player-create.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post() async createUpdatePlayer(
    @Body() playerCreateDto: PlayerCreateDto,
  ): Promise<{ message: string }> {
    await this.playersService.createUpdatePlayer(playerCreateDto);
    return { message: 'Player saved.' };
  }

  @Get() async getPlayers(
    @Query('email') email: string,
  ): Promise<Player[] | Player> {
    if (email) {
      return await this.playersService.getPlayerByEmail(email);
    } else {
      return await this.playersService.getAllPlayers();
    }
  }

  @Delete() async deletePlayer(
    @Query('email') email: string,
  ): Promise<{ message: string }> {
    this.playersService.deletePlayer(email);
    return { message: 'Player was deleted successfully' };
  }
}
