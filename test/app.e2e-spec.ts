import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/main (GET)', () => {
    return request(app.getHttpServer())
      .get('/main')
      .expect(200)
      .expect('Hello World');
  });

  it('/main/test (GET)', () => {
    return request(app.getHttpServer())
      .get('/main/test')
      .expect(200)
      .expect('Game eiei');
  });

  it('/movies/6 (Get)', () => {
    return request(app.getHttpServer())
      .get('/movies/6')
      .expect(200)
      .expect({
        id: 6,
        name: 'Kong',
        score: 8.8,
        description: 'To override just the message portion of the JSON response body, supply a string in the response argument. To override the entire JSON response body, pass an object in the response argument. Nest will serialize the object and return it as the JSON response body.'
      })
  })

  it('/movies/12 (Get) -> Exception', () => {
    return request(app.getHttpServer())
      .get('/movies/12')
      .expect(404)
  })

  it('/movies/find?name=no name (Get) -> Exception', () => {
    return request(app.getHttpServer())
      .get('/movies/find?name=no name')
      .expect(404)
  })

  it('/movies/find?name (Get)', () => {
    return request(app.getHttpServer())
      .get('/movies/find?name=The lord of the ring 3')
      .expect(200)
      .expect({
        id: 7,
        name: 'The lord of the ring 3',
        score: 9.3,
        description: 'Two Hobbits, Sméagol and his cousin, Déagol, are fishing when Déagol discovers the One Ring in the river. Sméagol\'s mind is ensnared by the Ring, and he kills his cousin for it. He retreats into the Misty Mountains as the Ring twists his body and mind until he becomes the creature Gollum.'
      })
  })
});
