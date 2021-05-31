import { RoleService } from './role.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}
  @Get()
  async all() {
    return this.roleService.all();
  }

  @Post()
  async create(@Body('name') name: string) {
    return this.roleService.create({ name });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.roleService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body('name') name: string) {
    await this.roleService.update(id, { name });

    return this.roleService.findOne({ id });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
