import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
  Logger,
  Inject,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { ErrorCode, Registration } from '@groundtruth/shared';
import { UsersRepository } from '../users/users.repository';
import { EmailVerificationService } from './email-verification.service';
import { PhoneVerificationService } from './phone-verification.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @Inject(EmailVerificationService)
    private readonly emailVerificationService: EmailVerificationService,
    @Inject(PhoneVerificationService)
    private readonly phoneVerificationService: PhoneVerificationService,
  ) {}

  /**
   * Register a new user with email and password
   * - Validates email format and uniqueness
   * - Hashes password with Argon2id
   * - Creates user record
   * - Sends verification email
   */
  async register(registrationData: Registration): Promise<{ message: string }> {
    const { email, password } = registrationData;

    // Check if email already exists
    const existingUser = await this.usersRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException({
        code: ErrorCode.EMAIL_ALREADY_EXISTS,
        message: 'An account with this email already exists',
        details: { email },
      });
    }

    // Hash password using Argon2id
    const passwordHash = await this.hashPassword(password);

    try {
      // Create user record
      const user = await this.usersRepository.create({
        email,
        passwordHash,
        emailVerified: false,
        phoneVerified: false,
        verificationStatus: 'unverified',
        isExpert: false,
        reputationScore: 0,
      });

      // Generate verification token
      const verification =
        await this.emailVerificationService.createVerificationToken(user.id);

      // Send verification email (async, don't block response)
      this.emailVerificationService
        .sendVerificationEmail(email, verification.token)
        .catch((error: Error) => {
          this.logger.error(`Failed to send verification email: ${error.message}`);
        });

      return {
        message: 'Check your email to verify your account',
      };
    } catch (error) {
      this.logger.error(`Registration failed: ${(error as Error).message}`);
      throw new BadRequestException({
        code: ErrorCode.VALIDATION_ERROR,
        message: 'Registration failed',
      });
    }
  }

  /**
   * Hash password using Argon2id
   * Configuration: variant=Argon2id, memory=65536KB, time=3, parallelism=4
   */
  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536, // 64 MB
      timeCost: 3,
      parallelism: 4,
    });
  }

  /**
   * Verify password against hash
   */
  async verifyPassword(hash: string, password: string): Promise<boolean> {
    try {
      return await argon2.verify(hash, password);
    } catch {
      return false;
    }
  }

  /**
   * Verify email using token
   * - Validates token exists and not expired
   * - Marks email as verified
   * - Returns redirect URL to phone setup page and userId for phone verification
   */
  async verifyEmail(token: string): Promise<{ redirectUrl: string; userId: string }> {
    // Verify the token
    const verification = await this.emailVerificationService.verifyToken(token);

    if (!verification) {
      throw new BadRequestException({
        code: ErrorCode.TOKEN_INVALID,
        message: 'Invalid or expired verification token',
      });
    }

    // Mark email as verified in users table
    await this.usersRepository.update(verification.userId, {
      emailVerified: true,
    });

    // Mark verification as complete
    await this.emailVerificationService.markAsVerified(verification.id);

    return {
      redirectUrl: '/register/phone-setup',
      userId: verification.userId,
    };
  }

  /**
   * Resend verification email
   * - Finds user by email
   * - Checks if email is already verified
   * - Generates new verification token
   * - Sends new verification email
   */
  async resendVerificationEmail(email: string): Promise<{ message: string }> {
    // Find user by email
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException({
        code: ErrorCode.USER_NOT_FOUND,
        message: 'No account found with this email',
        details: { email },
      });
    }

    // Check if email is already verified
    if (user.emailVerified) {
      throw new BadRequestException({
        code: ErrorCode.EMAIL_ALREADY_VERIFIED,
        message: 'Email is already verified',
        details: { email },
      });
    }

    // Generate new verification token
    const verification =
      await this.emailVerificationService.createVerificationToken(user.id);

    // Send verification email (async, don't block response)
    this.emailVerificationService
      .sendVerificationEmail(email, verification.token)
      .catch((error: Error) => {
        this.logger.error(`Failed to send verification email: ${error.message}`);
      });

    return {
      message: 'Verification email sent. Check your inbox.',
    };
  }

  /**
   * Send SMS verification code to phone number
   * - Validates phone format and uniqueness
   * - Generates 6-digit verification code
   * - Sends SMS code to phone number
   */
  async sendSmsCode(
    userId: string,
    phone: string,
  ): Promise<{ message: string }> {
    // Check if user exists
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new NotFoundException({
        code: ErrorCode.USER_NOT_FOUND,
        message: 'User not found',
        details: { userId },
      });
    }

    // Security: Verify email is verified before allowing phone setup
    if (!user.emailVerified) {
      throw new BadRequestException({
        code: ErrorCode.EMAIL_NOT_VERIFIED,
        message: 'Email must be verified before setting up phone verification',
        details: { userId },
      });
    }

    // Check if phone number is already registered to another user
    const existingUser = await this.usersRepository.findByPhone(phone);
    if (existingUser && existingUser.id !== userId) {
      throw new ConflictException({
        code: ErrorCode.PHONE_ALREADY_EXISTS,
        message: 'This phone number is already registered',
        details: { phone },
      });
    }

    try {
      // Create verification code record (returns plain code for SMS sending)
      const verification =
        await this.phoneVerificationService.createVerificationCode(
          userId,
          phone,
        );

      // Send SMS code (async, don't block response)
      this.phoneVerificationService
        .sendSmsCode(phone, verification.code)
        .catch((error: Error) => {
          this.logger.error(`Failed to send SMS code: ${error.message}`);
        });

      return {
        message: 'SMS verification code sent',
      };
    } catch (error) {
      this.logger.error(`Send SMS code failed: ${(error as Error).message}`);
      throw new BadRequestException({
        code: ErrorCode.SMS_SEND_FAILED,
        message: 'Failed to send SMS verification code',
      });
    }
  }

  /**
   * Verify phone number with SMS code
   * - Validates code exists and not expired
   * - Marks phone as verified
   * - Updates user verification status
   */
  async verifyPhone(
    userId: string,
    phone: string,
    code: string,
  ): Promise<{ message: string }> {
    // Verify the SMS code
    const verification = await this.phoneVerificationService.verifyCode(
      phone,
      code,
    );

    if (!verification) {
      throw new BadRequestException({
        code: ErrorCode.SMS_CODE_INVALID,
        message: 'Invalid or expired verification code',
      });
    }

    // Verify the code belongs to the correct user
    if (verification.userId !== userId) {
      throw new BadRequestException({
        code: ErrorCode.SMS_CODE_INVALID,
        message: 'Verification code does not match user',
      });
    }

    // Mark phone as verified in users table
    await this.usersRepository.updatePhoneVerified(userId, phone);

    // Mark verification as complete
    await this.phoneVerificationService.markAsVerified(verification.id);

    return {
      message: 'Phone number verified successfully',
    };
  }
}
