import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './application/tasks.service';
import { Types } from 'mongoose';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body('originalPath') originalPath: string) {
    const task = await this.tasksService.createTask(originalPath);
    return { taskId: task._id, status: task.status, price: task.price };
  }

  @Get(':taskId')
  async getTask(@Param('taskId') taskId: string) {
    if (!Types.ObjectId.isValid(taskId)) {
      throw new HttpException('Id not valid', HttpStatus.BAD_REQUEST);
    }
    const task = await this.tasksService.getTask(taskId);

    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    return {
      taskId: task._id,
      status: task.status,
      price: task.price,
      images: task.images || [],
    };
  }
}
