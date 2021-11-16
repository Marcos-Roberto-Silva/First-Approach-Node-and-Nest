import { Document } from 'mongoose';

export interface Player extends Document {
  readonly phoneNumber: string;
  readonly email: string;
  readonly name: string;
  ranking: string;
  positionRanking: number;
  urlPlayerPicture: string;
}
