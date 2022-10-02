import { Test } from '@nestjs/testing';
import { Todo, User } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { CACHE_MANAGER } from '@nestjs/common';
import { TodoController } from '@/todo/todo.controller';
import { TodoService } from '@/todo/todo.service';
import { Cache } from 'cache-manager';
import { PaginationOrder } from '@/common/types/PaginationOrder';
import { TodoQuery } from '@/common/types/TodoQuery';

describe('TodoController Unit Tests', () => {
  let todoController: TodoController;
  let todoService: TodoService;
  let todo: Todo;
  let cache: Cache;
  let user: User;
  let query: TodoQuery;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        PrismaService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => '',
            set: () => jest.fn(),
            del: () => jest.fn(),
            reset: () => jest.fn(),
          },
        },
      ],
    }).compile();

    todoController = moduleRef.get<TodoController>(TodoController);
    todoService = moduleRef.get<TodoService>(TodoService);
    cache = moduleRef.get<Cache>(CACHE_MANAGER);

    const date = new Date();
    todo = {
      id: 1,
      updatedAt: date,
      createdAt: date,
      text: 'Lorem ipsum dolor sit amet',
      isCompleted: false,
      userId: 1,
    };

    user = {
      fullName: 'John Doe',
      id: 1,
      email: 'john.doe@example.com',
      createdAt: date,
      updatedAt: date,
    };

    query = {
      page: 1,
      order: PaginationOrder.ASC,
      completed: false,
      pageSize: 5,
      searchTerm: '',
      get skip() {
        return 1;
      },
      getPaginationMeta() {
        return {
          currentPage: 1,
          pageSize: 5,
          totalPages: 10,
          totalRecords: 50,
          order: PaginationOrder.ASC,
          hasNextPage: true,
          hasPrevPage: false,
        };
      },
    };
  });

  it('Should return todo when provided id', async () => {
    const expected = { ...todo };

    jest
      .spyOn(todoService, 'getTodoById')
      .mockImplementation(async () => Promise.resolve(expected));

    const actual = await todoController.getTodoById(todo.id);
    expect(actual).toBe(expected);
  });

  it('Should return current user todos', async () => {
    const date = new Date();

    const data: Todo[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => ({
      id: num,
      text: `Lorem ipsum dolor sit amet ${num}`,
      updatedAt: date,
      createdAt: date,
      userId: 1,
      isCompleted: false,
    }));

    jest
      .spyOn(todoService, 'getTodosByEmail')
      .mockImplementation(async () => Promise.resolve([data, data.length]));

    jest.spyOn(cache, 'reset');

    const actual = await todoController.getTodos(user, query);

    expect(actual.data).toStrictEqual(data);
  });
});
