import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TasksRepository } from '../infrastructure/tasks.repository';
import { ImageProcessor } from '../infrastructure/image-processor.service';
import { TaskStatus } from '../../../common/enums';

const mockTaskRepository = {
  create: jest.fn(),
  updateStatus: jest.fn(),
  findById: jest.fn(),
};

const mockImageProcessor = {
  processImage: jest.fn(),
};

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useValue: mockTaskRepository },
        { provide: ImageProcessor, useValue: mockImageProcessor },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should create a task with pending status', async () => {
    const mockTask = { _id: '123', status: 'pending', price: 20 };
    mockTaskRepository.create.mockResolvedValue(mockTask);

    const result = await service.createTask('test.jpg');

    expect(result).toEqual(mockTask);
    expect(mockTaskRepository.create).toHaveBeenCalled();
  });

  it('should complete task when image processing succeeds', async () => {
    const mockTask = { _id: '123', status: TaskStatus.Pending, price: 20 };
    mockTaskRepository.create.mockResolvedValue(mockTask);
    mockImageProcessor.processImage.mockResolvedValue([
      { path: 'variant1.jpg', resolution: 480 },
      { path: 'variant2.jpg', resolution: 1080 },
    ]);

    await service.createTask('test.jpg');

    expect(mockTaskRepository.updateStatus).toHaveBeenCalledWith(
      '123',
      TaskStatus.Completed,
      [
        { path: 'variant1.jpg', resolution: 480 },
        { path: 'variant2.jpg', resolution: 1080 },
      ],
    );
  });

  it('should fail task when image processing fails', async () => {
    const mockTask = { _id: '123', status: TaskStatus.Pending, price: 20 };
    mockTaskRepository.create.mockResolvedValue(mockTask);
    mockImageProcessor.processImage.mockRejectedValue(
      new Error('Processing error'),
    );

    await service.createTask('test.jpg');

    expect(mockTaskRepository.updateStatus).toHaveBeenCalledWith(
      '123',
      TaskStatus.Failed,
      [],
    );
  });
});
