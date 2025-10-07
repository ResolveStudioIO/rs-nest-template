import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { type EnvironmentVariables } from './config/env.validation';

async function bootstrap() {
    const logger = new Logger(bootstrap.name);
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService<EnvironmentVariables>);

    const port = configService.getOrThrow<string>('PORT');
    const corsOrigins = configService
        .getOrThrow<string>('CORS_ORIGIN')
        .split(',')
        .map((o) => o.trim());

    app.enableCors({
        origin: corsOrigins,
        credentials: true,
    });

    app.use(helmet());
    app.use(compression());

    const config = new DocumentBuilder()
        .setTitle('Resolve Studio API')
        .setDescription('Base template for NestJS projects')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api/docs', app, document);

    await app.listen(port);

    logger.log(`Server running on: http://localhost:${port}`);
    logger.log(`Swagger running on: http://localhost:${port}/api/docs`);
}
void bootstrap();
