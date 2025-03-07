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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({
    description: 'Data to create a task',
    schema: {
      type: 'object',
      properties: {
        originalPath: { type: 'string', example: 'input/imagen.jpeg' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Data to create a task',
    schema: {
      type: 'object',
      properties: {
        originalPath: { type: 'string', example: 'input/imagen.jpeg' },
        status: { type: 'string', example: 'pending' },
        price: { type: 'number', example: 20.9 },
        _id: { type: 'string', example: '12312ab3235235m12' },
      },
    },
  })
  async createTask(@Body('originalPath') originalPath: string) {
    const task = await this.tasksService.createTask(originalPath);
    return { taskId: task._id, status: task.status, price: task.price };
  }

  @Get(':taskId')
  @ApiOperation({ summary: 'Get a task by ID' })
  @ApiResponse({
    status: 200,
    description: 'Find task',
    example: {
      type: 'object',
      properties: {
        originalPath: { type: 'string', example: 'input/imagen.jpeg' },
        price: { type: 'number', example: 20.9 },
        status: { type: 'string', example: 'failed' },
        _id: { type: 'string', example: '12312ab3235235m12' },
        images: { type: 'array', example: [] },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiResponse({ status: 400, description: 'Task id not valid.' })
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
