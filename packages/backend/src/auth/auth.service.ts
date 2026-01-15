import {
  Injectable,
  ConflictException,
  BadRequestException,
  Logger,
  Inject,
} from '@nestjs/common';
import * as argon2 from 'argon2';
import { ErrorCode, Registration } from '@groundtruth/shared';
import { UsersRepository } from '../users/users.repository';
import { EmailVerificationService } from './email-verification.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
    @Inject(EmailVerificationService)
    private readonly emailVerificationService: EmailVerificationService,
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
   * - Returns redirect URL to phone setup page
   */
  async verifyEmail(token: string): Promise<{ redirectUrl: string }> {
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
    };
  }
}
