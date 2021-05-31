import { UserUpdateDto } from './models/user-update.dto';
import { AuthGuard } from './../auth/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './models/user-create.dto';

@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // @Get()
  // async all(): Promise<User[]> {
  //   return this.userService.all();
  // }

  @Get()
  async all(@Query('page') page = 1): Promise<User[]> {
    return this.userService.paginate(page);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash('1234', 12);

    return this.userService.create({ ...body, password });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.userService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UserUpdateDto) {
    await this.userService.update(id, body);

    return this.userService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
