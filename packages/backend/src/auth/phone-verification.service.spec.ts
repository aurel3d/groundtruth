import 'reflect-metadata';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PhoneVerificationService } from './phone-verification.service';
import { PhoneVerification } from './entities/phone-verification.entity';

describe('PhoneVerificationService', () => {
  let service: PhoneVerificationService;

  const mockRepository = {
    create: vi.fn(),
    save: vi.fn(),
    findOne: vi.fn(),
    update: vi.fn(),
    createQueryBuilder: vi.fn(),
  };

  const mockConfigService = {
    get: vi.fn((key: string, defaultValue?: string) => {
      const config: Record<string, string> = {
        NODE_ENV: 'development',
        SMS_PROVIDER: 'console',
        TWILIO_ACCOUNT_SID: 'test-account-sid',
        TWILIO_AUTH_TOKEN: 'test-auth-token',
        TWILIO_VERIFY_SERVICE_SID: 'test-verify-sid',
      };
      return config[key] || defaultValue;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhoneVerificationService,
        {
          provide: getRepositoryToken(PhoneVerification),
          useValue: mockRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<PhoneVerificationService>(PhoneVerificationService);

    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateSmsCode', () => {
    it('should generate 6-digit numeric code when called', () => {
      const code = service.generateSmsCode();
      expect(code).toHaveLength(6);
      expect(code).toMatch(/^\d{6}$/);
    });

    it('should generate unique codes when called multiple times', () => {
      const code1 = service.generateSmsCode();
      const code2 = service.generateSmsCode();
      // Statistical test - codes should be different (very unlikely to be same)
      expect(code1).not.toBe(code2);
    });

    it('should generate code between 100000 and 999999', () => {
      const code = service.generateSmsCode();
      const numericCode = parseInt(code, 10);
      expect(numericCode).toBeGreaterThanOrEqual(100000);
      expect(numericCode).toBeLessThanOrEqual(999999);
    });
  });

  describe('createVerificationCode', () => {
    it('should create verification code with 10-minute expiry when userId and phone provided', async () => {
      const userId = 'test-user-id';
      const phone = '+33612345678';
      const mockVerification = {
        id: 'verification-id',
        userId,
        phone,
        code: 'hashed-code',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
        verifiedAt: null,
      };

      mockRepository.create.mockReturnValue(mockVerification);
      mockRepository.save.mockResolvedValue(mockVerification);

      const result = await service.createVerificationCode(userId, phone);

      // Result should have the plain code for SMS sending
      expect(result.userId).toBe(userId);
      expect(result.phone).toBe(phone);
      expect(result.code).toMatch(/^\d{6}$/); // Plain code should be 6 digits
      expect(result.expiresAt).toBeInstanceOf(Date);

      // Repository should be called with hashed code
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId,
          phone,
          code: expect.any(String),
          expiresAt: expect.any(Date),
        }),
      );
      expect(mockRepository.save).toHaveBeenCalled();
    });

    it('should hash the code before storing when creating verification', async () => {
      const userId = 'test-user-id';
      const phone = '+33612345678';

      mockRepository.create.mockImplementation((data) => data);
      mockRepository.save.mockResolvedValue({});

      await service.createVerificationCode(userId, phone);

      const createCall = mockRepository.create.mock.calls[0][0];
      // Code should be hashed (not 6 digits anymore)
      expect(createCall.code).not.toMatch(/^\d{6}$/);
      expect(createCall.code.length).toBeGreaterThan(6);
    });
  });

  describe('sendSmsCode', () => {
    it('should log SMS code when phone provided in development mode', async () => {
      const phone = '+33612345678';
      const code = '123456';
      const loggerSpy = vi.spyOn(service['logger'], 'log');

      await service.sendSmsCode(phone, code);

      expect(loggerSpy).toHaveBeenCalledWith(
        expect.stringContaining('SMS Verification (Development Mode)'),
      );
      expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining(phone));
      expect(loggerSpy).toHaveBeenCalledWith(expect.stringContaining(code));
    });

    it('should not throw error when called with valid phone number', async () => {
      const phone = '+33612345678';
      const code = '123456';

      await expect(service.sendSmsCode(phone, code)).resolves.not.toThrow();
    });
  });

  describe('verifyCode', () => {
    it('should return verification when valid code provided', async () => {
      const phone = '+33612345678';
      const code = '123456';
      // Hash the code using the same method as the service
      const crypto = await import('crypto');
      const hashedCode = crypto.createHash('sha256').update(code).digest('hex');

      const mockVerification = {
        id: 'verification-id',
        userId: 'user-id',
        phone,
        code: hashedCode,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes in future
        verifiedAt: null,
        createdAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(mockVerification);

      const result = await service.verifyCode(phone, code);

      expect(result).toEqual(mockVerification);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { phone },
        order: { createdAt: 'DESC' },
      });
    });

    it('should return null when no verification found for phone', async () => {
      const phone = '+33612345678';
      const code = '123456';

      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.verifyCode(phone, code);

      expect(result).toBeNull();
    });

    it('should return null when code already verified', async () => {
      const phone = '+33612345678';
      const code = '123456';
      const mockVerification = {
        id: 'verification-id',
        userId: 'user-id',
        phone,
        code: 'hashed-code',
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        verifiedAt: new Date(), // Already verified
        createdAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(mockVerification);

      const result = await service.verifyCode(phone, code);

      expect(result).toBeNull();
    });

    it('should return null when code expired', async () => {
      const phone = '+33612345678';
      const code = '123456';
      const mockVerification = {
        id: 'verification-id',
        userId: 'user-id',
        phone,
        code: 'hashed-code',
        expiresAt: new Date(Date.now() - 1000), // Expired 1 second ago
        verifiedAt: null,
        createdAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(mockVerification);

      const result = await service.verifyCode(phone, code);

      expect(result).toBeNull();
    });

    it('should return null when code does not match', async () => {
      const phone = '+33612345678';
      const code = '123456';
      const wrongCode = '654321';
      const mockVerification = {
        id: 'verification-id',
        userId: 'user-id',
        phone,
        code: 'hashed-wrong-code',
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        verifiedAt: null,
        createdAt: new Date(),
      };

      mockRepository.findOne.mockResolvedValue(mockVerification);

      // Mock the hash comparison to fail
      const result = await service.verifyCode(phone, wrongCode);

      // Should return null for wrong code
      expect(result).toBeNull();
    });
  });

  describe('markAsVerified', () => {
    it('should update verification with verified timestamp when verificationId provided', async () => {
      const verificationId = 'verification-id';
      mockRepository.update.mockResolvedValue({ affected: 1 });

      await service.markAsVerified(verificationId);

      expect(mockRepository.update).toHaveBeenCalledWith(verificationId, {
        verifiedAt: expect.any(Date),
      });
    });
  });

  describe('deleteExpiredCodes', () => {
    it('should delete expired and unverified codes when called', async () => {
      const mockQueryBuilder = {
        delete: vi.fn().mockReturnThis(),
        where: vi.fn().mockReturnThis(),
        andWhere: vi.fn().mockReturnThis(),
        execute: vi.fn().mockResolvedValue({ affected: 5 }),
      };

      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await service.deleteExpiredCodes();

      expect(mockQueryBuilder.delete).toHaveBeenCalled();
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('expires_at < :now', {
        now: expect.any(Date),
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith('verified_at IS NULL');
      expect(mockQueryBuilder.execute).toHaveBeenCalled();
    });
  });
});
