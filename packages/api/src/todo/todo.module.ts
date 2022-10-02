import { CacheModule, Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [CacheModule.register(), PrismaModule],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
