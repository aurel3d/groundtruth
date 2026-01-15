import { Controller, Post, Get, Body, Query, HttpCode, HttpStatus, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import {
  RegistrationSchema,
  Registration,
  EmailVerificationSchema,
  PhoneNumberSchema,
  VerifySmsCodeSchema,
  SendSmsCodeDto,
  VerifyPhoneDto,
} from '@groundtruth/shared';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ default: { limit: 5, ttl: 900000 } }) // 5 attempts per 15 minutes (900000ms)
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
  @Throttle({ default: { limit: 10, ttl: 900000 } }) // 10 attempts per 15 minutes (prevent brute force)
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

  @Post('resend-verification')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 3, ttl: 900000 } }) // 3 attempts per 15 minutes
  @ApiOperation({ summary: 'Resend email verification link to user' })
  @ApiResponse({
    status: 200,
    description: 'Verification email resent successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Verification email sent. Check your inbox.',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Email already verified or invalid email',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'EMAIL_ALREADY_VERIFIED' },
            message: { type: 'string', example: 'Email is already verified' },
            timestamp: { type: 'string', format: 'date-time' },
            requestId: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'USER_NOT_FOUND' },
            message: { type: 'string', example: 'No account found with this email' },
            timestamp: { type: 'string', format: 'date-time' },
            requestId: { type: 'string' },
          },
        },
      },
    },
  })
  async resendVerification(
    @Body() body: { email: string },
  ): Promise<{ message: string }> {
    return this.authService.resendVerificationEmail(body.email);
  }

  @Post('send-sms-code')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 900000 } }) // 5 attempts per 15 minutes (NFR-S9)
  @UsePipes(new ZodValidationPipe(PhoneNumberSchema))
  @ApiOperation({ summary: 'Send SMS verification code to phone number' })
  @ApiResponse({
    status: 200,
    description: 'SMS code sent successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'SMS verification code sent',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid phone format or SMS send failed',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'INVALID_PHONE_FORMAT' },
            message: {
              type: 'string',
              example: 'Invalid phone number format',
            },
            timestamp: { type: 'string', format: 'date-time' },
            requestId: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Phone number already exists',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'PHONE_ALREADY_EXISTS' },
            message: {
              type: 'string',
              example: 'This phone number is already registered',
            },
            details: { type: 'object', properties: { phone: { type: 'string' } } },
            timestamp: { type: 'string', format: 'date-time' },
            requestId: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 429,
    description: 'Rate limit exceeded',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'PHONE_VERIFICATION_RATE_LIMIT_EXCEEDED' },
            message: {
              type: 'string',
              example: 'Too many attempts. Please try again later.',
            },
            timestamp: { type: 'string', format: 'date-time' },
            requestId: { type: 'string' },
          },
        },
      },
    },
  })
  async sendSmsCode(
    @Body() body: SendSmsCodeDto & { userId: string },
  ): Promise<{ message: string }> {
    return this.authService.sendSmsCode(body.userId, body.phone);
  }

  @Post('verify-phone')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 5, ttl: 900000 } }) // 5 attempts per 15 minutes
  @UsePipes(new ZodValidationPipe(VerifySmsCodeSchema))
  @ApiOperation({ summary: 'Verify phone number with SMS code' })
  @ApiResponse({
    status: 200,
    description: 'Phone verified successfully',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Phone number verified successfully',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired code',
    schema: {
      type: 'object',
      properties: {
        error: {
          type: 'object',
          properties: {
            code: { type: 'string', example: 'SMS_CODE_INVALID' },
            message: {
              type: 'string',
              example: 'Invalid or expired verification code',
            },
            timestamp: { type: 'string', format: 'date-time' },
            requestId: { type: 'string' },
          },
        },
      },
    },
  })
  async verifyPhone(
    @Body() body: VerifyPhoneDto & { userId: string },
  ): Promise<{ message: string }> {
    return this.authService.verifyPhone(body.userId, body.phone, body.code);
  }
}
