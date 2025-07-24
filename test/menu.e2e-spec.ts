import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { MenuModule } from './../src/menu/menu.module';

describe('Menuroller (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MenuModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/menu (GET) deve retornar array', () => {
    return request(app.getHttpServer())
      .get('/menu')
      .expect(200)
      .expect((res) => {
        if (!Array.isArray(res.body)) {
          throw new Error('Response body is not an array');
        }
      });
  });

  it('/menu (GET) deve retornar um array nao vazio', () => {
    return request(app.getHttpServer())
      .get('/menu')
      .expect(200)
      .expect((res) => {
        if (Array.isArray(res.body) && res.body.length === 0) {
          throw new Error('Response array is empty');
        }
      });
  });

  it('/menu (GET) deve retornar 12 itens', () => {
    return request(app.getHttpServer())
      .get('/menu')
      .expect(200)
      .expect((res) => {
        if (Array.isArray(res.body) && res.body.length !== 12) {
          throw new Error('Response array is incomplete');
        }
      });
  });
});
