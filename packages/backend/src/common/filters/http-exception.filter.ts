import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorCode } from '@groundtruth/shared';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      error: {
        code:
          typeof exceptionResponse === 'object' && 'code' in exceptionResponse
            ? (exceptionResponse as { code: string }).code
            : ErrorCode.INTERNAL_SERVER_ERROR,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as { message: string }).message || 'Internal server error',
        details:
          typeof exceptionResponse === 'object' && 'details' in exceptionResponse
            ? (exceptionResponse as { details: unknown }).details
            : undefined,
        timestamp: new Date().toISOString(),
        requestId: (request as { id?: string }).id || 'unknown',
      },
    };

    response.status(status).json(errorResponse);
  }
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      error: {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        timestamp: new Date().toISOString(),
        requestId: (request as { id?: string }).id || 'unknown',
      },
    };

    console.error('Unhandled exception:', exception);

    response.status(status).json(errorResponse);
  }
}
