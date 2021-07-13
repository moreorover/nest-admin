import { CommonModule } from './../common/common.module';
import { Permission } from './models/permission.entity';
import { Module } from '@nestjs/common';
import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), CommonModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
