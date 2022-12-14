import {
  Body,
  CACHE_MANAGER,
  CacheKey,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiConsumes, ApiProduces, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/auth/guards';
import { User as RequestUser } from '@/user/decorators';
import { Todo, User } from '@prisma/client';
import { TodoService } from './todo.service';
import { CreateTodoDto, UpdateTodoDto } from '@/todo/dto';
import { TodoQuery } from '@/common/types/TodoQuery';
import { Cache } from 'cache-manager';

@ApiTags('todo')
@ApiConsumes('application/json')
@ApiProduces('application/json')
@Controller({
  version: '1',
  path: 'todo',
})
export class TodoController {
  constructor(
    private todoService: TodoService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  @CacheKey('todos')
  @CacheTTL(0)
  async getTodos(
    @RequestUser() user: User,
    @Query() query: TodoQuery,
  ): Promise<{
    data: Todo[];
    pagination: {
      totalPages: number;
      currentPage: number;
    };
  }> {
    await this.cacheManager.reset();
    const [data, totalRecords] = await this.todoService.getTodosByEmail(user.email, query);
    return {
      data,
      pagination: query.getPaginationMeta(totalRecords),
    };
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getTodoById(@Param('id') id: number) {
    return await this.todoService.getTodoById(id);
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createTodo(@RequestUser() user: User, @Body() dto: CreateTodoDto): Promise<Todo> {
    await this.cacheManager.reset();
    return await this.todoService.createTodo(user, dto);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateTodo(@Param('id') id: number, @Body() dto: UpdateTodoDto): Promise<Todo> {
    await this.cacheManager.reset();
    return await this.todoService.updateTodo(id, dto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteTodo(@Param('id') id: number): Promise<Todo> {
    await this.cacheManager.reset();
    return await this.todoService.deleteTodo(id);
  }
}
