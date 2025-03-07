import { Injectable } from '@nestjs/common';
import { TasksRepository } from '../infrastructure/tasks.repository';
import { Task } from '../domain/task.schema';
import { TaskStatus } from 'src/common/enums';
import { ImageProcessor } from '../infrastructure/image-processor.service';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly imageProcessor: ImageProcessor,
  ) {}

  async createTask(originalPath: string): Promise<Task> {
    const price = parseFloat((Math.random() * (50 - 5) + 5).toFixed(2));
    const task = await this.tasksRepository.create({
      originalPath,
      status: TaskStatus.Pending,
      price,
    });
    try {
      const processedImages =
        await this.imageProcessor.processImage(originalPath);
      await this.tasksRepository.updateStatus(
        task._id as string,
        TaskStatus.Completed,
        processedImages,
      );
    } catch (e) {
      console.error(e);
      await this.tasksRepository.updateStatus(
        task._id as string,
        TaskStatus.Failed,
        [],
      );
    }

    return task;
  }

  async getTask(taskId: string): Promise<Task | null> {
    return this.tasksRepository.findById(taskId);
  }
}
