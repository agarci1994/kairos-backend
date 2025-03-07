import { Injectable } from '@nestjs/common';
import { TasksRepository } from '../infrastructure/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}
}
