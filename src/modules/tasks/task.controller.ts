import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { TasksService } from './application/tasks.service';

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
    const task = await this.tasksService.getTask(taskId);

    if (!task) {
      return { message: 'Task not found', statusCode: 404 };
    }
    return {
      taskId: task._id,
      status: task.status,
      price: task.price,
      images: task.images || [],
    };
  }
}
