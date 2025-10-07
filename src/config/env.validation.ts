import { plainToInstance } from 'class-transformer';
import { IsEnum, IsNumber, IsString, Matches, validateSync } from 'class-validator';

/**
 * Available environment modes for the application.
 */
enum Env {
    Development = 'development',
    Test = 'test',
    Production = 'production',
}

/**
 * Defines and validates all required environment variables.
 * Used together with `ConfigModule.forRoot({ validate })`.
 */
export class EnvironmentVariables {
    /** Application environment mode (development | test | production). */
    @IsEnum(Env)
    public NODE_ENV: Env;

    /** Application port number (e.g., 3000). */
    @IsNumber({}, { message: 'PORT must be a numeric value' })
    public PORT: number;

    /** PostgreSQL connection string. */
    @Matches(/^postgres(ql)?:\/\/.+$/, {
        message: 'DATABASE_URL must be a valid PostgreSQL connection string',
    })
    public DATABASE_URL: string;

    /** Comma-separated list of allowed CORS origins. */
    @IsString()
    public CORS_ORIGIN: string;

    /** Throttler TTL (milliseconds, e.g. 60000). */
    @IsNumber({}, { message: 'THROTTLER_TTL must be a numeric value (milliseconds)' })
    public THROTTLER_TTL: number;

    /** Throttler request limit per TTL window (e.g. 100). */
    @IsNumber({}, { message: 'THROTTLER_LIMIT must be a numeric value' })
    public THROTTLER_LIMIT: number;
}

/**
 * Validates environment variables loaded from process.env.
 *
 * @param config - Object containing environment variables (usually `process.env`)
 * @returns Validated and transformed EnvironmentVariables instance
 * @throws Error if validation fails
 */
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
