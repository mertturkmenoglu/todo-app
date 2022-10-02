import { PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from '@/todo/dto/create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
