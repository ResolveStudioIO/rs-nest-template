import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { isObject } from 'class-validator';
import { Response } from 'express';

/**
 * Global HTTP exception filter.
 *
 * Catches all instances of `HttpException` and transforms them
 * into a unified JSON error response with consistent structure.
 *
 * Example response:
 * ```json
 * {
 *   "statusCode": 400,
 *   "error": "Bad Request",
 *   "message": "Validation failed",
 *   "timestamp": "2025-10-07T21:45:00.000Z"
 * }
 * ```
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    /**
     * Handles caught HttpExceptions and sends formatted JSON responses.
     *
     * @param exception - The caught HttpException instance
     * @param host - ArgumentsHost providing context about the current request
     */
    public catch(exception: HttpException, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const response = exception.getResponse();

        let payload: Record<string, unknown> = {};

        if (typeof response === 'string') {
            payload = { message: response };
        } else if (isObject(response)) {
            payload = { ...response };
        }

        res.status(status).json({
            statusCode: status,
            error: payload['error'] ?? exception.name,
            message: payload['message'] ?? exception.message,
            timestamp: new Date().toISOString(),
        });
    }
}
