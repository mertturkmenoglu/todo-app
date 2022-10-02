import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiConsumes, ApiProduces, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards';
import { UserService } from '@/user/user.service';
import { isHttpException } from '@/common';
import { User as RequestUser } from '@/user/decorators';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto';

@ApiTags('user')
@ApiConsumes('application/json')
@ApiProduces('application/json')
@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@RequestUser() user: User): Promise<User> {
    const result = await this.userService.getUserByEmail(user.email);

    if (isHttpException(result)) {
      throw result;
    }

    return result;
  }

  @Get('/:email')
  @UseGuards(JwtAuthGuard)
  async getUserByUsername(@Param('email') email: string): Promise<User> {
    const result = await this.userService.getUserByEmail(email);

    if (isHttpException(result)) {
      throw result;
    }

    return result;
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateUser(@Param('id') id: number, @Body() dto: UpdateUserDto): Promise<User> {
    return await this.userService.updateUser(id, dto);
  }
}
