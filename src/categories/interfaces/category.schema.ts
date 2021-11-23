import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema(
  {
    category: { type: 'string', unique: true },
    description: { type: 'string' },
    events: [
      {
        name: { type: 'string' },
        operation: { type: 'string' },
        value: { type: Number },
      },
    ],
    players: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player',
      },
    ],
  },
  { timestamps: true, collection: 'categories' },
);
