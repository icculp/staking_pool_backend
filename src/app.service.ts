import { Injectable } from '@nestjs/common';
import { Pool, PoolDocument } from './schemas/pool.schema';
import { Account, AccountDocument } from './schemas/account.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AccountDto } from './dto/account.dto';
import { PoolDto } from './dto/pool.dto';
import { MyLogger } from './my-logger.service';

@Injectable()
export class AppService {private readonly logger = new MyLogger(AppService.name);
  constructor(@InjectModel(Account.name) private readonly accountModel: Model<AccountDocument>,
              @InjectModel(Pool.name) private readonly poolModel: Model<PoolDocument>) {}
  
  // Account
  async createAccount(accountDto: AccountDto): Promise < AccountDocument > {
    this.logger.log(['createAccount', accountDto]);
    const account = new this.accountModel(accountDto);
    return account.save();
  }

  async findAllAccount(): Promise < AccountDocument[] > {
    this.logger.log('findAllAccount');
    return this.accountModel.find().exec();
  }

  async findOneAccount(id: string) {
    return this.accountModel.findById(id);
  }

  async updateAccount(id: string, accountDto: AccountDto): Promise < AccountDocument > {
    return this.accountModel.findByIdAndUpdate(id, accountDto);
  }

  async removeAccount(id: string) {
    return this.accountModel.findByIdAndRemove(id);
  }

  // Pool
  async createPool(poolDto: PoolDto): Promise < PoolDocument > {
    const pool = new this.poolModel(poolDto);
    return pool.save();
  }

  async findAllPool(): Promise < PoolDocument[] > {
    return this.poolModel.find().exec();
  }

  async findOnePool(id: string) {
    return this.poolModel.findById(id);
  }

  async updatePool(id: string, poolDto: PoolDto): Promise < PoolDocument > {
    return this.poolModel.findByIdAndUpdate(id, poolDto);
  }

  async removePool(id: string) {
    return this.poolModel.findByIdAndRemove(id);
  }

}
