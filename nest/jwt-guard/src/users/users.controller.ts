import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles('admin')
  findAll() {
    return ['user1', 'user2'];
  }
}
