import { Module } from '@nestjs/common';

import { ExampleController } from './example.controller';
import { ExampleUseCase } from './use-cases/example.use-case';

@Module({
    controllers: [ExampleController],
    providers: [ExampleUseCase],
})
export class ExampleModule {}
