import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import { AccountDto } from './dto/account.dto';
import { PoolDto } from './dto/pool.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() accountDto: AccountDto) {
    return this.appService.createAccount(accountDto);
  }

  @Get()
  findAll() {
    return this.appService.findAllAccount();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOneAccount(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() accountDto: AccountDto) {
    return this.appService.updateAccount(id, accountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.removeAccount(id);
  }
}

@Controller('pool')
export class PoolController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() poolDto: PoolDto) {
    return this.appService.createPool(poolDto);
  }

  @Get()
  findAll() {
    return this.appService.findAllPool();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appService.findOnePool(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() poolDto: PoolDto) {
    return this.appService.updatePool(id, poolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appService.removePool(id);
  }
}
