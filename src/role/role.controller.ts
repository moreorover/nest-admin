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
  async create(
    @Body('name') name: string,
    @Body('permissions') permissions: number[],
  ) {
    return this.roleService.create({
      name,
      permissions: permissions.map((id) => ({ id })),
    });
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.roleService.findOne({ id }, ['permissions']);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string,
    @Body('permissions') permissions: number[],
  ) {
    await this.roleService.update(id, { name });

    const role = await this.roleService.findOne({ id });

    return this.roleService.create({
      ...role,
      permissions: permissions.map((id) => ({ id })),
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
