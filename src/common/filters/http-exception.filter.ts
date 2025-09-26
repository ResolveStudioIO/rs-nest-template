import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { isObject } from 'class-validator';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    public catch(exception: HttpException, host: ArgumentsHost) {
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
