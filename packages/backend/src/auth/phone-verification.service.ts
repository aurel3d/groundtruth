import { Injectable, Logger, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHash, randomInt } from 'crypto';
import { PhoneVerification } from './entities/phone-verification.entity';

@Injectable()
export class PhoneVerificationService {
  private readonly logger = new Logger(PhoneVerificationService.name);

  constructor(
    @InjectRepository(PhoneVerification)
    private readonly phoneVerificationRepository: Repository<PhoneVerification>,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  /**
   * Generate a cryptographically secure random 6-digit numeric SMS code
   * Uses crypto.randomInt() for secure random generation
   * @returns 6-digit numeric string (e.g., "123456")
   */
  generateSmsCode(): string {
    // Generate secure random number between 100000 and 999999 (inclusive)
    const code = randomInt(100000, 1000000);
    return code.toString();
  }

  /**
   * Hash SMS code for secure storage
   * @param code - Plain text 6-digit code
   * @returns SHA-256 hash of the code
   */
  private hashCode(code: string): string {
    return createHash('sha256').update(code).digest('hex');
  }

  /**
   * Create and store phone verification record
   * Code expires in 10 minutes
   * @param userId - User ID requesting verification
   * @param phone - Phone number in E.164 format (e.g., "+33612345678")
   * @returns Object with verification entity and plain code for SMS sending
   */
  async createVerificationCode(
    userId: string,
    phone: string,
  ): Promise<PhoneVerification & { code: string }> {
    const plainCode = this.generateSmsCode();
    const hashedCode = this.hashCode(plainCode);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 minutes expiry

    const verification = this.phoneVerificationRepository.create({
      userId,
      phone,
      code: hashedCode,
      expiresAt,
    });

    const savedVerification = await this.phoneVerificationRepository.save(verification);

    // Return saved verification with plain code for SMS sending
    // IMPORTANT: code property contains PLAIN TEXT code, not the hashed version stored in DB
    return Object.assign(savedVerification, { code: plainCode });
  }

  /**
   * Send SMS verification code
   * Environment-aware implementation:
   * - Development: Logs to console for easy testing
   * - Production: Uses Twilio Verify API
   *
   * @param phone - Phone number in E.164 format
   * @param code - 6-digit verification code to send
   */
  async sendSmsCode(phone: string, code: string): Promise<void> {
    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');
    const smsProvider = this.configService.get<string>('SMS_PROVIDER', 'console');

    // Development mode: Log to console for easy testing
    if (nodeEnv === 'development' || smsProvider === 'console') {
      this.logger.log(`
        ========================================
        SMS Verification (Development Mode)
        ========================================
        To: ${phone}
        Code: ${code}
        ========================================

        In production, set SMS_PROVIDER to 'twilio'
        and configure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN,
        and TWILIO_VERIFY_SERVICE_SID.
      `);
      return;
    }

    // Production mode: Use Twilio Verify API
    if (smsProvider === 'twilio') {
      await this.sendWithTwilio(phone, code);
    } else {
      this.logger.warn(
        `Unknown SMS_PROVIDER: ${smsProvider}. Falling back to console logging.`,
      );
      this.logger.log(`SMS code for ${phone}: ${code}`);
    }
  }

  /**
   * Send SMS using Twilio Verify API
   * Requires: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_VERIFY_SERVICE_SID
   * @param phone - Phone number in E.164 format
   * @param code - 6-digit verification code
   */
  private async sendWithTwilio(phone: string, code: string): Promise<void> {
    const accountSid = this.configService.get<string>('TWILIO_ACCOUNT_SID');
    const authToken = this.configService.get<string>('TWILIO_AUTH_TOKEN');
    const verifySid = this.configService.get<string>('TWILIO_VERIFY_SERVICE_SID');

    if (!accountSid || !authToken || !verifySid) {
      this.logger.error('Twilio credentials not configured. Cannot send SMS.');
      throw new Error('SMS service not configured');
    }

    try {
      // Twilio integration using basic SMS (not Verify API for custom codes)
      // We use programmable SMS to send our own generated codes
      const twilio = await import('twilio');
      const client = twilio.default(accountSid, authToken);

      await client.messages.create({
        body: `Your Groundtruth verification code is: ${code}. This code expires in 10 minutes.`,
        to: phone,
        from: this.configService.get<string>('TWILIO_PHONE_NUMBER'),
      });

      this.logger.log(`SMS sent successfully to ${phone}`);
    } catch (error) {
      this.logger.error(`Twilio SMS failed: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Verify SMS code for a phone number
   * @param phone - Phone number in E.164 format
   * @param code - 6-digit verification code to verify
   * @returns PhoneVerification entity if valid, null otherwise
   */
  async verifyCode(
    phone: string,
    code: string,
  ): Promise<PhoneVerification | null> {
    // Find most recent verification for this phone
    const verification = await this.phoneVerificationRepository.findOne({
      where: { phone },
      order: { createdAt: 'DESC' },
    });

    if (!verification) {
      return null;
    }

    // Check if already verified
    if (verification.verifiedAt) {
      return null;
    }

    // Check if expired
    if (new Date() > verification.expiresAt) {
      return null;
    }

    // Verify the code matches (compare hashes)
    const hashedInputCode = this.hashCode(code);
    if (hashedInputCode !== verification.code) {
      return null;
    }

    return verification;
  }

  /**
   * Mark verification as complete
   * @param verificationId - ID of the verification to mark as complete
   */
  async markAsVerified(verificationId: string): Promise<void> {
    await this.phoneVerificationRepository.update(verificationId, {
      verifiedAt: new Date(),
    });
  }

  /**
   * Clean up expired verification codes (housekeeping)
   * Deletes unverified codes that have expired
   */
  async deleteExpiredCodes(): Promise<void> {
    await this.phoneVerificationRepository
      .createQueryBuilder()
      .delete()
      .where('expires_at < :now', { now: new Date() })
      .andWhere('verified_at IS NULL')
      .execute();
  }
}
