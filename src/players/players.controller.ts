import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { PlayerCreateDto } from './dtos/player-create.dto';
import { PlayerUpdateDto } from './dtos/player-update.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';
import { PlyersValidatorParameter } from '../common/pipes/validator-parameter.pipe';
@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async playerCreated(
    @Body()
    playerCreateDto: PlayerCreateDto,
  ): Promise<{ message: string }> {
    const player = await this.playersService.playerCreate(playerCreateDto);
    return { message: `Player saved with id: ${player._id}` };
  }

  @Put(':_id')
  @UsePipes(ValidationPipe)
  async playerUpdated(
    @Body()
    playerUpdateDto: PlayerUpdateDto,
    @Param('_id', PlyersValidatorParameter) _id: string,
  ): Promise<{ message: string }> {
    await this.playersService.playerUpdate(_id, playerUpdateDto);
    console.log('Vam ve: ', playerUpdateDto);

    return { message: 'Player was updadted' };
  }

  @Get() async getAllPlayers(): Promise<Player[]> {
    return await this.playersService.getAllPlayers();
  }

  @Get('/:_id') async getPlayerById(
    @Param('_id', PlyersValidatorParameter) _id: string,
  ): Promise<Player> {
    return await this.playersService.getPlayerById(_id);
  }

  @Delete('/:_id') async deletePlayer(
    @Param('_id', PlyersValidatorParameter) _id: string,
  ): Promise<{ message: string }> {
    this.playersService.deletePlayer(_id);
    return { message: 'Player was deleted successfully' };
  }
}
