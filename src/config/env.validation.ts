import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Matches, validateSync } from 'class-validator';

enum Env {
    Development = 'development',
    Test = 'test',
    Production = 'production',
}

export class EnvironmentVariables {
    @IsEnum(Env)
    public NODE_ENV: Env;

    @IsNumber()
    public PORT: number;

    @Matches(/^postgres(ql)?:\/\/.+$/)
    public DATABASE_URL: string;

    @IsString()
    public CORS_ORIGIN: string;
}

export function validate(config: Record<string, unknown>) {
    const validated = plainToInstance(EnvironmentVariables, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validated, { skipMissingProperties: false });
    if (errors.length > 0) {
        throw new Error(
            errors
                .map((err) =>
                    err.constraints ? `${err.property}: ${Object.values(err.constraints).join(', ')}` : `${err.property}: invalid`,
                )
                .join('; '),
        );
    }
    return validated;
}
