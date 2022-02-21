import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { BookingsModule } from '../../src/bookings/bookings.module';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnection } from 'typeorm';
import {testDbConfig, clearDb} from '../testDbConfig';


describe('Bookings', () => {
  let connection: Connection;
  let app: INestApplication;
  const predifinedBookingName = "oldBooking"
  const newBookingName = "mockNewBookingName"

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        BookingsModule,
        TypeOrmModule.forRoot(testDbConfig)
      ],
    })
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
    // insert dummy data in bookings table
    connection = getConnection();
    try {
      await getConnection().query(`INSERT INTO public."booking" (name) VALUES ('${predifinedBookingName}')`)
    } catch(e) {
      console.log(e);
    }
  });

  it(`/POST bookings - 201`, () => {
    return request(app.getHttpServer())
      .post('/booking')
      .send({name: newBookingName})
      .expect(201)
      .expect({id: 2, name: newBookingName});
  });

  it(`/POST bookings - 400, throws error is name alrady eixsts`, () => {
    return request(app.getHttpServer())
      .post('/booking')
      .send({name: newBookingName})
      .expect(400)
      .expect({
        statusCode: 400,
        message: 'Booking with the name "mockNewBookingName" already existsss',
        error: 'Bad Request'
      });
  });

  it(`/GET bookings - 200`, () => {
    return request(app.getHttpServer())
      .get('/booking')
      .expect(200)
      .expect([{id: 1, name: predifinedBookingName}, {id: 2, name: newBookingName}]);
  });

  it(`/DELETE bookings - 200`, () => {
    return request(app.getHttpServer())
      .delete('/booking/1')
      .expect(200)
      .expect({ raw: [], affected: 1 });
  });

  afterAll(async () => {
    await clearDb(connection);
    await app.close();
  });
});