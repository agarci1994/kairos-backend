import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('Tasks API (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forRoot(process.env.MONGO_URI_TEST || ''),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST - /tasks - 201', async () => {
    const response = await request(app.getHttpServer())
      .post('/tasks')
      .send({ originalPath: 'input/image.jpeg' })
      .expect(201);

    expect(response.body).toHaveProperty('taskId');
    expect(response.body).toHaveProperty('price');
    expect(response.body.status).toEqual('pending');
  });

  it('GET - /task/:taskid - 200 - status failed', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/tasks')
      .send({ originalPath: 'error.jpg' });
    const taskId = createResponse.body.taskId as string;

    const response = await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200);

    expect(response.body).toHaveProperty('images');
    expect(response.body.status).toEqual('failed');
  });

  it('GET - /task/:taskid - 200 - status completed', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/tasks')
      .send({ originalPath: 'input/imagen.jpeg' });
    const taskId = createResponse.body.taskId as string;

    const response = await request(app.getHttpServer())
      .get(`/tasks/${taskId}`)
      .expect(200);

    expect(response.body).toHaveProperty('images');
    expect(response.body.images.length).toEqual(2);
    expect(response.body.status).toEqual('completed');
  });

  it('/GET - 404', async () => {
    const taskId = '67caf222d81c9b0658910301';
    await request(app.getHttpServer()).get(`/tasks/${taskId}`).expect(404);
  });
});
