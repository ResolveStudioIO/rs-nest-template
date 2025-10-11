import { type INestApplication } from '@nestjs/common';
import { Test, type TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import type { App } from 'supertest/types';

import { AppModule } from '@/app.module';
import { PrismaService } from '@/prisma/prisma.service';

describe('ExampleController (e2e)', () => {
    let app: INestApplication<App>;
    let prisma!: PrismaService;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        prisma = app.get(PrismaService);

        await prisma.user.deleteMany();
        await prisma.user.createMany({
            data: [
                {
                    email: 'example.user1@local.test',
                    name: 'Example User One',
                },
                {
                    email: 'example.user2@local.test',
                    name: 'Example User Two',
                },
            ],
        });
    });

    afterAll(async () => {
        await prisma.user.deleteMany();
        await app.close();
    });

    it('/example (GET) → should return users', async () => {
        const res = await request(app.getHttpServer()).get('/example').expect(200);

        expect(res.body).toEqual(
            expect.objectContaining({
                users: expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.anything(),
                        email: expect.stringContaining('@'),
                    }),
                ]),
            }),
        );
    });
});
