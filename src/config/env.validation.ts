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
    @IsNumber()
    public PORT: number;

    /** PostgreSQL connection string. */
    @Matches(/^postgres(ql)?:\/\/.+$/)
    public DATABASE_URL: string;

    /** Comma-separated list of allowed CORS origins. */
    @IsString()
    public CORS_ORIGIN: string;

    /** Throttler TTL (e.g., 60_000). */
    @IsNumber()
    public THROTTLER_TTL: number;

    /** Throttler limit (e.g., 100). */
    @IsNumber()
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
