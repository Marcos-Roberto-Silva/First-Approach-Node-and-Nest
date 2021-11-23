import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import * as dotenv from 'dotenv';
dotenv.config();

const { SQUEMA } = process.env;
console.log(SQUEMA);

@Module({
  imports: [MongooseModule.forRoot(SQUEMA), PlayersModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
