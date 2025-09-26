import { ApiProperty } from '@nestjs/swagger';

export class ExampleResponseDto {
    @ApiProperty({ example: true, description: 'Флаг успешного ответа' })
    public ok: boolean;

    @ApiProperty({ example: 'Привет из rs-nest-template', description: 'Сообщение' })
    public msg: string;
}
