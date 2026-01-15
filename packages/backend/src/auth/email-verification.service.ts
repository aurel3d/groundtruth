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
   *
   * Environment-aware implementation:
   * - Development: Logs to console for easy testing
   * - Production: Uses configured email service (SendGrid/AWS SES)
   */
  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationLink = `${this.frontendUrl}/verify-email?token=${token}`;
    const emailSubject = 'Verify your email address - Groundtruth';
    const emailBody = this.buildVerificationEmailHtml(email, verificationLink);

    const nodeEnv = this.configService.get<string>('NODE_ENV', 'development');
    const emailProvider = this.configService.get<string>('EMAIL_PROVIDER', 'console');

    // Development mode: Log to console for easy testing
    if (nodeEnv === 'development' || emailProvider === 'console') {
      this.logger.log(`
        ========================================
        Email Verification (Development Mode)
        ========================================
        To: ${email}
        Subject: ${emailSubject}
        Link: ${verificationLink}
        ========================================

        In production, set EMAIL_PROVIDER to 'sendgrid' or 'aws-ses'
        and configure appropriate API keys.
      `);
      return;
    }

    // Production mode: Route to configured email service
    switch (emailProvider) {
      case 'sendgrid':
        await this.sendWithSendGrid(email, emailSubject, emailBody);
        break;
      case 'aws-ses':
        await this.sendWithAwsSes(email, emailSubject, emailBody);
        break;
      default:
        this.logger.warn(
          `Unknown EMAIL_PROVIDER: ${emailProvider}. Falling back to console logging.`,
        );
        this.logger.log(`Verification link: ${verificationLink}`);
    }
  }

  /**
   * Build HTML email template for verification
   */
  private buildVerificationEmailHtml(_email: string, verificationLink: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify your email</title>
        </head>
        <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; padding: 40px;">
                  <tr>
                    <td>
                      <h1 style="color: #333333; font-size: 24px; margin: 0 0 20px 0;">Verify your email address</h1>
                      <p style="color: #666666; font-size: 16px; line-height: 1.5; margin: 0 0 20px 0;">
                        Thanks for signing up for Groundtruth! Please verify your email address by clicking the button below.
                      </p>
                      <p style="margin: 30px 0;">
                        <a href="${verificationLink}"
                           style="background-color: #4F46E5; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                          Verify Email Address
                        </a>
                      </p>
                      <p style="color: #666666; font-size: 14px; line-height: 1.5; margin: 20px 0 0 0;">
                        Or copy and paste this link into your browser:
                      </p>
                      <p style="color: #4F46E5; font-size: 14px; word-break: break-all; margin: 10px 0 20px 0;">
                        ${verificationLink}
                      </p>
                      <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
                      <p style="color: #999999; font-size: 12px; margin: 0;">
                        This link will expire in 24 hours. If you didn't create an account with Groundtruth, you can safely ignore this email.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;
  }

  /**
   * Send email using SendGrid
   * Requires: SENDGRID_API_KEY environment variable
   */
  private async sendWithSendGrid(
    to: string,
    _subject: string,
    _html: string,
  ): Promise<void> {
    const apiKey = this.configService.get<string>('SENDGRID_API_KEY');

    if (!apiKey) {
      this.logger.error('SENDGRID_API_KEY not configured. Cannot send email.');
      throw new Error('Email service not configured');
    }

    try {
      // SendGrid integration would go here
      // Example (requires @sendgrid/mail package):
      // const sgMail = require('@sendgrid/mail');
      // sgMail.setApiKey(apiKey);
      // await sgMail.send({ to, from: fromEmail, subject, html });

      this.logger.warn('SendGrid integration pending. Install @sendgrid/mail package.');
      this.logger.log(`Would send to ${to} via SendGrid`);
    } catch (error) {
      this.logger.error(`SendGrid email failed: ${(error as Error).message}`);
      throw error;
    }
  }

  /**
   * Send email using AWS SES
   * Requires: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION environment variables
   */
  private async sendWithAwsSes(
    to: string,
    _subject: string,
    _html: string,
  ): Promise<void> {
    const awsRegion = this.configService.get<string>('AWS_REGION');

    if (!awsRegion) {
      this.logger.error('AWS_REGION not configured. Cannot send email.');
      throw new Error('Email service not configured');
    }

    try {
      // AWS SES integration would go here
      // Example (requires @aws-sdk/client-ses package):
      // const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
      // const client = new SESClient({ region: awsRegion });
      // const command = new SendEmailCommand({
      //   Source: fromEmail,
      //   Destination: { ToAddresses: [to] },
      //   Message: {
      //     Subject: { Data: subject },
      //     Body: { Html: { Data: html } }
      //   }
      // });
      // await client.send(command);

      this.logger.warn('AWS SES integration pending. Install @aws-sdk/client-ses package.');
      this.logger.log(`Would send to ${to} via AWS SES`);
    } catch (error) {
      this.logger.error(`AWS SES email failed: ${(error as Error).message}`);
      throw error;
    }
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
