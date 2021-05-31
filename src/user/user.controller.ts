import { PaginatedResult } from './../common/models/paginated-result';
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

  @Get()
  async all(@Query('page') page = 1): Promise<PaginatedResult> {
    return this.userService.paginate(page, ['role']);
  }

  @Post()
  async create(@Body() body: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash('1234', 12);

    const { role_id, ...data } = body;

    return this.userService.create({
      ...data,
      password,
      role: { id: role_id },
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.userService.findOne({ id }, ['role']);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UserUpdateDto) {
    const { role_id, ...data } = body;
    await this.userService.update(id, { ...data, role: { id: role_id } });
    return this.userService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
