import { Controller } from '@nestjs/common';
import { TasksService } from './application/tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}
}
