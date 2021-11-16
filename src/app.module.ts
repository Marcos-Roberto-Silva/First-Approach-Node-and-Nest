import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

const { SQUEMA } = process.env;
console.log(SQUEMA);

@Module({
  imports: [MongooseModule.forRoot(SQUEMA), PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
