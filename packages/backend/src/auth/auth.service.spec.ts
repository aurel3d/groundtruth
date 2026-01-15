import 'reflect-metadata';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, BadRequestException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { AuthService } from './auth.service';
import { UsersRepository } from '../users/users.repository';
import { EmailVerificationService } from './email-verification.service';
import { ErrorCode } from '@groundtruth/shared';

vi.mock('argon2');

describe('AuthService', () => {
  let service: AuthService;

  const mockUsersRepository = {
    findByEmail: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  };

  const mockEmailVerificationService = {
    createVerificationToken: vi.fn(),
    sendVerificationEmail: vi.fn(),
    verifyToken: vi.fn(),
    markAsVerified: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersRepository,
          useValue: mockUsersRepository,
        },
        {
          provide: EmailVerificationService,
          useValue: mockEmailVerificationService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);

    vi.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    const validRegistration = {
      email: 'test@example.com',
      password: 'SecurePassword123!',
    };

    it('should successfully register user when valid data provided', async () => {
      const mockUser = {
        id: 'user-id',
        email: validRegistration.email,
        passwordHash: 'hashed-password',
        emailVerified: false,
        phoneVerified: false,
        verificationStatus: 'unverified',
        isExpert: false,
        reputationScore: 0,
      };

      const mockVerification = {
        id: 'verification-id',
        userId: mockUser.id,
        token: 'verification-token',
        expiresAt: new Date(),
      };

      mockUsersRepository.findByEmail.mockResolvedValue(null);
      mockUsersRepository.create.mockResolvedValue(mockUser);
      (argon2.hash as any).mockResolvedValue('hashed-password');
      mockEmailVerificationService.createVerificationToken.mockResolvedValue(
        mockVerification,
      );
      mockEmailVerificationService.sendVerificationEmail.mockResolvedValue(undefined);

      const result = await service.register(validRegistration);

      expect(result).toEqual({
        message: 'Check your email to verify your account',
      });
      expect(mockUsersRepository.findByEmail).toHaveBeenCalledWith(
        validRegistration.email,
      );
      expect(argon2.hash).toHaveBeenCalledWith(validRegistration.password, {
        type: argon2.argon2id,
        memoryCost: 65536,
        timeCost: 3,
        parallelism: 4,
      });
      expect(mockUsersRepository.create).toHaveBeenCalledWith({
        email: validRegistration.email,
        passwordHash: 'hashed-password',
        emailVerified: false,
        phoneVerified: false,
        verificationStatus: 'unverified',
        isExpert: false,
        reputationScore: 0,
      });
      expect(
        mockEmailVerificationService.createVerificationToken,
      ).toHaveBeenCalledWith(mockUser.id);
    });

    it('should throw ConflictException when email already exists', async () => {
      const existingUser = {
        id: 'existing-user-id',
        email: validRegistration.email,
      };

      mockUsersRepository.findByEmail.mockResolvedValue(existingUser);

      await expect(service.register(validRegistration)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.register(validRegistration)).rejects.toThrow(
        expect.objectContaining({
          response: expect.objectContaining({
            code: ErrorCode.EMAIL_ALREADY_EXISTS,
            message: 'An account with this email already exists',
            details: { email: validRegistration.email },
          }),
        }),
      );
    });

    it('should throw BadRequestException when user creation fails', async () => {
      mockUsersRepository.findByEmail.mockResolvedValue(null);
      (argon2.hash as any).mockResolvedValue('hashed-password');
      mockUsersRepository.create.mockRejectedValue(new Error('Database error'));

      await expect(service.register(validRegistration)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should not block response when email sending fails', async () => {
      const mockUser = {
        id: 'user-id',
        email: validRegistration.email,
        passwordHash: 'hashed-password',
      };

      const mockVerification = {
        id: 'verification-id',
        userId: mockUser.id,
        token: 'verification-token',
        expiresAt: new Date(),
      };

      mockUsersRepository.findByEmail.mockResolvedValue(null);
      mockUsersRepository.create.mockResolvedValue(mockUser);
      (argon2.hash as any).mockResolvedValue('hashed-password');
      mockEmailVerificationService.createVerificationToken.mockResolvedValue(
        mockVerification,
      );
      mockEmailVerificationService.sendVerificationEmail.mockRejectedValue(
        new Error('Email service unavailable'),
      );

      // Should still succeed even if email fails
      const result = await service.register(validRegistration);

      expect(result).toEqual({
        message: 'Check your email to verify your account',
      });
    });
  });

  describe('verifyPassword', () => {
    it('should return true when password matches hash', async () => {
      (argon2.verify as any).mockResolvedValue(true);

      const result = await service.verifyPassword('hash', 'password');

      expect(result).toBe(true);
      expect(argon2.verify).toHaveBeenCalledWith('hash', 'password');
    });

    it('should return false when password does not match hash', async () => {
      (argon2.verify as any).mockResolvedValue(false);

      const result = await service.verifyPassword('hash', 'wrong-password');

      expect(result).toBe(false);
    });

    it('should return false when verification throws error', async () => {
      (argon2.verify as any).mockRejectedValue(new Error('Invalid hash'));

      const result = await service.verifyPassword('invalid-hash', 'password');

      expect(result).toBe(false);
    });
  });

  describe('verifyEmail', () => {
    it('should successfully verify email when valid token provided', async () => {
      const token = 'valid-token';
      const mockVerification = {
        id: 'verification-id',
        userId: 'user-id',
        token,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60),
        verifiedAt: null,
      };

      mockEmailVerificationService.verifyToken.mockResolvedValue(mockVerification);
      mockUsersRepository.update.mockResolvedValue(undefined);
      mockEmailVerificationService.markAsVerified.mockResolvedValue(undefined);

      const result = await service.verifyEmail(token);

      expect(result).toEqual({ redirectUrl: '/register/phone-setup' });
      expect(mockEmailVerificationService.verifyToken).toHaveBeenCalledWith(token);
      expect(mockUsersRepository.update).toHaveBeenCalledWith(mockVerification.userId, {
        emailVerified: true,
      });
      expect(mockEmailVerificationService.markAsVerified).toHaveBeenCalledWith(
        mockVerification.id,
      );
    });

    it('should throw BadRequestException when token is invalid', async () => {
      mockEmailVerificationService.verifyToken.mockResolvedValue(null);

      await expect(service.verifyEmail('invalid-token')).rejects.toThrow(
        BadRequestException,
      );
      await expect(service.verifyEmail('invalid-token')).rejects.toThrow(
        expect.objectContaining({
          response: expect.objectContaining({
            code: ErrorCode.TOKEN_INVALID,
            message: 'Invalid or expired verification token',
          }),
        }),
      );
    });

    it('should throw BadRequestException when token is expired', async () => {
      mockEmailVerificationService.verifyToken.mockResolvedValue(null);

      await expect(service.verifyEmail('expired-token')).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
