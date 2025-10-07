import { ApiProperty } from '@nestjs/swagger';

export class ExampleResponseDto {
    @ApiProperty({ example: true, description: 'Indicates whether the response was successful' })
    public ok: boolean;

    @ApiProperty({ example: 'Hello from rs-nest-template', description: 'Response message' })
    public msg: string;
}
