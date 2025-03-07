import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './application/tasks.service';
import { TasksRepository } from './infrastructure/tasks.repository';
import { Task, TaskSchema } from './domain/task.schema';
import { TasksController } from './task.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  providers: [TasksService, TasksRepository],
  controllers: [TasksController],
  exports: [TasksService],
})
export class TasksModule {}
