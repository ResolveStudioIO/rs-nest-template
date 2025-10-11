import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';

import { ExampleOutputType } from '../types';

@Injectable()
export class ExampleUseCase {
    constructor(private readonly prisma: PrismaService) {}

    public async execute(): Promise<ExampleOutputType> {
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return { users };
    }
}
