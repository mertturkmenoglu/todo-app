import {
  Body,
  Controller,
  Delete,
  Get,
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

@ApiTags('todo')
@ApiConsumes('application/json')
@ApiProduces('application/json')
@Controller({
  version: '1',
  path: 'todo',
})
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
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
    const [data, totalRecords] = await this.todoService.getTodosByEmail(user.email, query);
    return {
      data,
      pagination: query.getPaginationMeta(totalRecords),
    };
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createTodo(@RequestUser() user: User, @Body() dto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.createTodo(user, dto);
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  async updateTodo(@Param('id') id: number, @Body() dto: UpdateTodoDto): Promise<Todo> {
    return await this.todoService.updateTodo(id, dto);
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  async deleteTood(@Param('id') id: number): Promise<Todo> {
    return await this.todoService.deleteTodo(id);
  }
}
