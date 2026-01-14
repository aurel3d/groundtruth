import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerification } from './entities/email-verification.entity';

describe('EmailVerificationService', () => {
  let service: EmailVerificationService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    createQueryBuilder: jest.fn(),
  };

  const mockConfigService = {
    get: jest.fn((_key: string, defaultValue: string) => defaultValue),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailVerificationService,
        {
          provide: getRepositoryToken(EmailVerification),
          useValue: mockRepository,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<EmailVerificationService>(EmailVerificationService);

    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateVerificationToken', () => {
    it('should generate a 64-character hex token when called', () => {
      const token = service.generateVerificationToken();
      expect(token).toHaveLength(64); // 32 bytes = 64 hex characters
      expect(token).toMatch(/^[0-9a-f]{64}$/);
    });

    it('should generate unique tokens when called multiple times', () => {
      const token1 = service.generateVerificationToken();
      const token2 = service.generateVerificationToken();
      expect(token1).not.toBe(token2);
    });
  });

  describe('createVerificationToken', () => {
    it('should create verification token with 24-hour expiry when userId provided', async () => {
      const userId = 'test-user-id';
      const mockVerification = {
        id: 'verification-id',
        userId,
        token: 'test-token',
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        verifiedAt: null,
      };

      mockRepository.create.mockReturnValue(mockVerification);
      mockRepository.save.mockResolvedValue(mockVerification);

      const result = await service.createVerificationToken(userId);

      expect(result).toEqual(mockVerification);
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId,
          token: expect.any(String),
          expiresAt: expect.any(Date),
        }),
      );
      expect(mockRepository.save).toHaveBeenCalledWith(mockVerification);
    });
  });

  describe('sendVerificationEmail', () => {
    it('should log verification link when email and token provided', async () => {
      const email = 'test@example.com';
      const token = 'test-token';
      const loggerSpy = jest.spyOn(service['logger'], 'log');

      await service.sendVerificationEmail(email, token);

      expect(loggerSpy).toHaveBeenCalledWith(
        expect.stringContaining('http://localhost:3000/verify-email?token=test-token'),
      );
    });
  });

  describe('verifyToken', () => {
    it('should return verification record when valid token provided', async () => {
      const token = 'valid-token';
      const mockVerification = {
        id: 'verification-id',
        userId: 'user-id',
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60), // 1 hour in future
        verifiedAt: null,
        user: { id: 'user-id', email: 'test@example.com' },
      };

      mockRepository.findOne.mockResolvedValue(mockVerification);

      const result = await service.verifyToken(token);

      expect(result).toEqual(mockVerification);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { token },
        relations: ['user'],
      });
    });

    it('should return null when token does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.verifyToken('non-existent-token');

      expect(result).toBeNull();
    });

    it('should return null when token is already verified', async () => {
      const mockVerification = {
        id: 'verification-id',
        token: 'already-verified-token',
        verifiedAt: new Date(), // Already verified
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
      };

      mockRepository.findOne.mockResolvedValue(mockVerification);

      const result = await service.verifyToken('already-verified-token');

      expect(result).toBeNull();
    });

    it('should return null when token is expired', async () => {
      const mockVerification = {
        id: 'verification-id',
        token: 'expired-token',
        expiresAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour in past
        verifiedAt: null,
      };

      mockRepository.findOne.mockResolvedValue(mockVerification);

      const result = await service.verifyToken('expired-token');

      expect(result).toBeNull();
    });
  });

  describe('markAsVerified', () => {
    it('should update verified_at timestamp when verificationId provided', async () => {
      const verificationId = 'test-verification-id';
      mockRepository.update.mockResolvedValue({ affected: 1 });

      await service.markAsVerified(verificationId);

      expect(mockRepository.update).toHaveBeenCalledWith(verificationId, {
        verifiedAt: expect.any(Date),
      });
    });
  });

  describe('deleteExpiredTokens', () => {
    it('should delete unverified expired tokens when called', async () => {
      const mockQueryBuilder = {
        delete: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ affected: 5 }),
      };

      mockRepository.createQueryBuilder.mockReturnValue(mockQueryBuilder);

      await service.deleteExpiredTokens();

      expect(mockQueryBuilder.delete).toHaveBeenCalled();
      expect(mockQueryBuilder.where).toHaveBeenCalledWith('expires_at < :now', {
        now: expect.any(Date),
      });
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith('verified_at IS NULL');
      expect(mockQueryBuilder.execute).toHaveBeenCalled();
    });
  });
});
