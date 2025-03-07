import { Injectable } from '@nestjs/common';
import { TasksRepository } from '../infrastructure/tasks.repository';
import { Task } from '../domain/task.schema';
import { TaskStatus } from 'src/common/enums';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async createTask(originalPath: string): Promise<Task> {
    const price = parseFloat((Math.random() * (50 - 5) + 5).toFixed(2));
    return this.tasksRepository.create({
      originalPath,
      status: TaskStatus.Pending,
      price,
    });
  }

  async getTask(taskId: string): Promise<Task | null> {
    return this.tasksRepository.findById(taskId);
  }
}
