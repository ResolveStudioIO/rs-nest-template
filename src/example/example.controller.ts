import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ExampleResponseDto } from './dto';
import { ExampleUseCase } from './use-cases/example.use-case';

@ApiTags('example')
@Controller('example')
export class ExampleController {
    constructor(private readonly exampleUseCase: ExampleUseCase) {}

    @Get()
    @ApiOperation({ summary: 'Пример эндпоинта "hello"' })
    @ApiResponse({
        status: 200,
        description: 'Успешный ответ',
        type: ExampleResponseDto,
    })
    public getHello(): ExampleResponseDto {
        return this.exampleUseCase.execute();
    }
}
