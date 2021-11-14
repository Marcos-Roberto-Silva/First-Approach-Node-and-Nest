import { Body, Controller, Post } from '@nestjs/common';
import { PlayerCreateDto } from './dtos/player-create.dto';
@Controller('api/v1/players')
export class PlayersController {
  @Post() async createUpdatePlayer(@Body() playerCreate: PlayerCreateDto) {
    const { email } = playerCreate;
    return JSON.stringify(`{ message: ${email}, }`);
  }
}
