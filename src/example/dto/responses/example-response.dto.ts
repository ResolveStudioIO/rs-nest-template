import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class ExampleResponseUserDto implements User {
    @ApiProperty({ example: 1, description: 'User ID' })
    public id: number;

    @ApiProperty({ example: 'John Doe', description: 'User name' })
    public name: string | null;

    @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
    public email: string;
}

export class ExampleResponseDto {
    @ApiProperty({ example: [], description: 'Users', type: [ExampleResponseUserDto] })
    public users: ExampleResponseUserDto[];
}
