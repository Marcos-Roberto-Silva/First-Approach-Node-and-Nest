import { Document } from 'mongoose';
import { Player } from 'src/players/interfaces/player.interface';
import { challengeStatus } from './challenge-status.enun';

export interface Challenge extends Document {
  dateHourChallenge: Date;
  status: ChallengeStatus;
  dateHourRequest: Date;
  dateHourResponse: Date;
  requester: Player;
  category: string;
  players: Array<Player>;
  match: Match;
}

export interface Match extends Document {
  category: string;
  players: Array<Player>;
  def: player;
  result: Array<Result>;
}

export interface Result {
  set: string;
}
