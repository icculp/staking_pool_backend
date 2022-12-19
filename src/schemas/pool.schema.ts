import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Account } from './account.schema';
import * as mongoose from 'mongoose';

export type PoolDocument = HydratedDocument<Pool>;

@Schema()
export class Pool {
  @Prop()
  pool_address: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  owner: Account;

  @Prop()
  network: string;
}

export const PoolSchema = SchemaFactory.createForClass(Pool);