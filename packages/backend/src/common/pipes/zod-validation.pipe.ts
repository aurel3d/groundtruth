import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema, ZodError } from 'zod';
import { ErrorCode } from '@groundtruth/shared';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown): unknown {
    try {
      return this.schema.parse(value);
    } catch (error) {
      if (error instanceof ZodError) {
        const messages = error.errors.map((e) => `${e.path.join('.')}: ${e.message}`);
        throw new BadRequestException({
          code: ErrorCode.VALIDATION_ERROR,
          message: 'Validation failed',
          details: { errors: messages },
        });
      }
      throw error;
    }
  }
}
