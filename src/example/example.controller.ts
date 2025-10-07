import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ExampleResponseDto } from './dto';
import { ExampleUseCase } from './use-cases/example.use-case';

@ApiTags('example')
@Controller('example')
export class ExampleController {
    constructor(private readonly exampleUseCase: ExampleUseCase) {}

    @Get()
    @ApiOperation({ summary: 'Example "hello" endpoint' })
    @ApiResponse({
        status: 200,
        description: 'Successful response',
        type: ExampleResponseDto,
    })
    public getHello(): Promise<ExampleResponseDto> {
        return this.exampleUseCase.execute();
    }
}
