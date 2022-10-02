import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Todo, User } from '@prisma/client';
import { CreateTodoDto, UpdateTodoDto } from '@/todo/dto';
import { TodoQuery } from '@/common/types/TodoQuery';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async getTodosByEmail(email: string, query: TodoQuery): Promise<[Todo[], number]> {
    const txt = query.searchTerm ? { contains: query.searchTerm ?? undefined } : undefined;

    const whereQuery = {
      user: {
        email,
      },
      isCompleted: query.completed ?? undefined,
      text: txt,
    };

    if (query.completed === null) {
      delete whereQuery.isCompleted;
    }

    if (query.searchTerm === null) {
      delete whereQuery.text;
    }

    const [data, totalRecords] = await this.prisma.$transaction([
      this.prisma.todo.findMany({
        where: whereQuery,
        orderBy: {
          createdAt: query.order,
        },
        skip: query.pageSize * (query.page - 1),
        take: query.pageSize,
      }),
      this.prisma.todo.count({
        where: whereQuery,
      }),
    ]);

    return [data, totalRecords];
  }

  async createTodo(user: User, dto: CreateTodoDto): Promise<Todo> {
    return await this.prisma.todo.create({
      data: {
        user: {
          connect: {
            email: user.email,
          },
        },
        text: dto.text,
        isCompleted: dto.isCompleted,
      },
    });
  }

  async updateTodo(id: number, dto: UpdateTodoDto): Promise<Todo> {
    return await this.prisma.todo.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTodo(id: number): Promise<Todo> {
    return await this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }
}
