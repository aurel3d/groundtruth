import { Controller, Post, Get, Body, Query, HttpCode, HttpStatus, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { RegistrationSchema, Registration, EmailVerificationSchema } from '@groundtruth/shared';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ZodValidationPipe(RegistrationSchema))
  @ApiOperation({ summary: 'Register a new user with email and password' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully. Verification email sent.',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Check your email to verify your account',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input (email format, password requirements)',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'VALIDATION_ERROR' },
            message: { type: 'string', example: 'Validation failed' },
            details: { type: 'object' },
            timestamp: { type: 'string', format: 'date-time' },
            requestId: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'EMAIL_ALREADY_EXISTS' },
            message: {
              type: 'string',
              example: 'An account with this email already exists',
            },
            details: { type: 'object', properties: { email: { type: 'string' } } },
            timestamp: { type: 'string', format: 'date-time' },
            requestId: { type: 'string' },
          },
        },
      },
    },
  })
  async register(@Body() body: Registration): Promise<{ message: string }> {
    return this.authService.register(body);
  }

  @Get('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verify email address using token from email link' })
  @ApiQuery({
    name: 'token',
    type: 'string',
    description: 'Email verification token',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Email verified successfully',
    schema: {
      type: 'object',
      properties: {
        redirectUrl: {
          type: 'string',
          example: '/register/phone-setup',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired token',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'TOKEN_INVALID' },
            message: {
              type: 'string',
              example: 'Invalid or expired verification token',
            },
            timestamp: { type: 'string', format: 'date-time' },
            requestId: { type: 'string' },
          },
        },
      },
    },
  })
  async verifyEmail(
    @Query('token') token: string,
  ): Promise<{ redirectUrl: string }> {
    // Validate token with Zod
    const validated = EmailVerificationSchema.parse({ token });
    return this.authService.verifyEmail(validated.token);
  }
}
