import { Injectable, Logger, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { EmailVerification } from './entities/email-verification.entity';

@Injectable()
export class EmailVerificationService {
  private readonly logger = new Logger(EmailVerificationService.name);
  private readonly frontendUrl: string;

  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailVerificationRepository: Repository<EmailVerification>,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.frontendUrl = this.configService.get<string>(
      'FRONTEND_URL',
      'http://localhost:3000',
    );
  }

  /**
   * Generate a secure random verification token (32 bytes, hex)
   */
  generateVerificationToken(): string {
    return randomBytes(32).toString('hex');
  }

  /**
   * Create and store email verification record
   * Token expires in 24 hours
   */
  async createVerificationToken(userId: string): Promise<EmailVerification> {
    const token = this.generateVerificationToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours expiry

    const verification = this.emailVerificationRepository.create({
      userId,
      token,
      expiresAt,
    });

    return this.emailVerificationRepository.save(verification);
  }

  /**
   * Send verification email with link
   * Link format: {FRONTEND_URL}/verify-email?token={token}
   */
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationLink = `${this.frontendUrl}/verify-email?token=${token}`;

    // TODO: Implement actual email sending with SendGrid or AWS SES
    // For now, log the verification link
    this.logger.log(`
      ========================================
      Email Verification Link
      ========================================
      To: ${email}
      Link: ${verificationLink}
      ========================================
    `);

    // In production, this would be:
    // await this.emailService.send({
    //   to: email,
    //   subject: 'Verify your email address',
    //   template: 'email-verification',
    //   context: { verificationLink }
    // });
  }

  /**
   * Verify token and return verification record
   */
  async verifyToken(token: string): Promise<EmailVerification | null> {
    const verification = await this.emailVerificationRepository.findOne({
      where: { token },
      relations: ['user'],
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

    return verification;
  }

  /**
   * Mark verification as complete
   */
  async markAsVerified(verificationId: string): Promise<void> {
    await this.emailVerificationRepository.update(verificationId, {
      verifiedAt: new Date(),
    });
  }

  /**
   * Clean up expired verification tokens (housekeeping)
   */
  async deleteExpiredTokens(): Promise<void> {
    await this.emailVerificationRepository
      .createQueryBuilder()
      .delete()
      .where('expires_at < :now', { now: new Date() })
      .andWhere('verified_at IS NULL')
      .execute();
  }
}
