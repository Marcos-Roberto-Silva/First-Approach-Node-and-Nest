import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

const squema =  process.env.SQUEMA;
@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:8F4MFEieMMjMxeJx@cluster0.p9amh.mongodb.net/SmartRanking?retryWrites=true&w=majority'),
    PlayersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
