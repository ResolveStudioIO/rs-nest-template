import { ApiProperty } from '@nestjs/swagger';

export class ExampleResponseUserDto {
    @ApiProperty({ example: 1, description: 'User ID' })
    public id: number;

    @ApiProperty({ example: 'John Doe', description: 'User name', nullable: true })
    public name: string | null;

    @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
    public email: string;
}

export class ExampleResponseDto {
    @ApiProperty({
        example: [
            {
                id: 1,
                name: 'John Doe',
                email: 'john.doe@example.com',
            },
        ],
        description: 'Users',
        type: [ExampleResponseUserDto],
    })
    public users: ExampleResponseUserDto[];
}
