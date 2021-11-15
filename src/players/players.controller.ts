import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { PlayerCreateDto } from './dtos/player-create.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post() async createUpdatePlayer(@Body() playerCreateDto: PlayerCreateDto) {
    await this.playersService.createUpdatePlayer(playerCreateDto);
  }

  @Get() async getPlayers(
      @Query('email') email: string): Promise<Player[] | Player> {
          if (email) {
            return await this.playersService.getPlayerByEmail(email);
          } else {
            return await this.playersService.getAllPlayers();
          }
  }

  @Delete() async deletePlayer( 
      @Query('email') email: string): Promise<void> {
        this.playersService.deletePlayer(email);
  }
}
