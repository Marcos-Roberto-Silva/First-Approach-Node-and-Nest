import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { PlayerCreateDto } from './dtos/player-create.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
import { PlyersValidatorParameter } from './pipes/player-validator-parameter.pipe';
@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createUpdatePlayer(
    @Body()
    playerCreateDto: PlayerCreateDto,
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
    @Query('email', PlyersValidatorParameter) email: string,
  ): Promise<{ message: string }> {
    this.playersService.deletePlayer(email);
    return { message: 'Player was deleted successfully' };
  }
}
