import { type INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import type { App } from 'supertest/types';

import { AppModule } from '../src/app.module';

describe('ExampleController (e2e)', () => {
    let app: INestApplication<App>;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('/example (GET) → should return users', async () => {
        const res = await request(app.getHttpServer()).get('/example').expect(200);

        expect(res.body).toEqual(
            expect.objectContaining({
                users: expect.any(Array),
            }),
        );

        const { users } = res.body;

        expect(Array.isArray(users)).toBe(true);
        expect(users).toHaveLength(11);

        const user = users[0];

        expect(user).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.anything(),
                email: expect.any(String),
            }),
        );
    });
});
