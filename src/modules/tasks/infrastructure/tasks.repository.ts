import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../domain/task.schema';

@Injectable()
export class TasksRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(task: Partial<Task>): Promise<Task> {
    return new this.taskModel(task).save();
  }

  async findById(taskId: string): Promise<Task | null> {
    return this.taskModel.findById(taskId).exec();
  }
}
