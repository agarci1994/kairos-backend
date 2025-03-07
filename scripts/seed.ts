import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { TaskStatus } from '../src/common/enums';
import { TasksRepository } from '../src/modules/tasks/infrastructure/tasks.repository';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tasksRepository = app.get(TasksRepository);

  const tasks = [
    {
      originalPath: '/input/example1.jpg',
      status: TaskStatus.Failed,
      price: 15.99,
      images: [],
    },
    {
      originalPath: '/input/example2.jpg',
      status: TaskStatus.Completed,
      price: 40.49,
      images: [
        { resolution: '1024', path: '/output/example2/1024/hash1.jpg' },
        { resolution: '800', path: '/output/example2/800/hash2.jpg' },
      ],
    },
    {
      originalPath: '/input/example3.jpg',
      status: TaskStatus.Failed,
      price: 10.0,
    },
    {
      originalPath: '/input/example4.jpg',
      status: TaskStatus.Completed,
      price: 35.49,
      images: [
        { resolution: '1024', path: '/output/example2/1024/hash1.jpg' },
        { resolution: '800', path: '/output/example2/800/hash2.jpg' },
      ],
    },
    {
      originalPath: '/input/example5.jpg',
      status: TaskStatus.Completed,
      price: 15.49,
      images: [
        { resolution: '1024', path: '/output/example2/1024/hash1.jpg' },
        { resolution: '800', path: '/output/example2/800/hash2.jpg' },
      ],
    },
    {
      originalPath: '/input/example6.jpg',
      status: TaskStatus.Completed,
      price: 22.49,
      images: [
        { resolution: '1024', path: '/output/example2/1024/hash1.jpg' },
        { resolution: '800', path: '/output/example2/800/hash2.jpg' },
      ],
    },
  ];

  for (const task of tasks) {
    const response = await tasksRepository.create(task);
    console.log(response);
  }

  console.log('✅ Database successfully!');
  await app.close();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
