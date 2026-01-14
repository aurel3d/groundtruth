import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { User } from '../../src/users/entities/user.entity';
import { EmailVerification } from '../../src/auth/entities/email-verification.entity';

describe('Auth (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Apply global pipes (same as in main.ts)
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();

    dataSource = app.get(DataSource);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clean up database before each test
    await dataSource.getRepository(EmailVerification).delete({});
    await dataSource.getRepository(User).delete({});
  });

  describe('POST /api/v1/auth/register', () => {
    it('should successfully register a new user when valid data provided', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).toHaveProperty('message');
          expect(res.body.message).toBe('Check your email to verify your account');
        });
    });

    it('should return 409 when email already exists', async () => {
      // First registration
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201);

      // Duplicate registration
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'DifferentPassword123!',
        })
        .expect(409)
        .expect((res) => {
          expect(res.body.error).toHaveProperty('code', 'EMAIL_ALREADY_EXISTS');
          expect(res.body.error).toHaveProperty('message');
        });
    });

    it('should return 400 when email format is invalid', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'invalid-email',
          password: 'SecurePassword123!',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toHaveProperty('code', 'VALIDATION_ERROR');
        });
    });

    it('should return 400 when password does not meet requirements', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'short',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toHaveProperty('code', 'VALIDATION_ERROR');
        });
    });

    it('should create user with email_verified set to false', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201);

      const user = await dataSource
        .getRepository(User)
        .findOne({ where: { email: 'test@example.com' } });

      expect(user).toBeDefined();
      expect(user?.emailVerified).toBe(false);
      expect(user?.verificationStatus).toBe('unverified');
    });

    it('should create email verification token when user registered', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201);

      const user = await dataSource
        .getRepository(User)
        .findOne({ where: { email: 'test@example.com' } });

      const verification = await dataSource
        .getRepository(EmailVerification)
        .findOne({ where: { userId: user?.id } });

      expect(verification).toBeDefined();
      expect(verification?.token).toBeDefined();
      expect(verification?.token).toHaveLength(64);
      expect(verification?.expiresAt).toBeInstanceOf(Date);
    });
  });

  describe('GET /api/v1/auth/verify-email', () => {
    it('should successfully verify email when valid token provided', async () => {
      // Register user
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201);

      // Get verification token
      const user = await dataSource
        .getRepository(User)
        .findOne({ where: { email: 'test@example.com' } });

      const verification = await dataSource
        .getRepository(EmailVerification)
        .findOne({ where: { userId: user?.id } });

      // Verify email
      return request(app.getHttpServer())
        .get('/api/v1/auth/verify-email')
        .query({ token: verification?.token })
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('redirectUrl', '/register/phone-setup');
        });
    });

    it('should mark user email_verified as true after verification', async () => {
      // Register user
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201);

      const user = await dataSource
        .getRepository(User)
        .findOne({ where: { email: 'test@example.com' } });

      const verification = await dataSource
        .getRepository(EmailVerification)
        .findOne({ where: { userId: user?.id } });

      // Verify email
      await request(app.getHttpServer())
        .get('/api/v1/auth/verify-email')
        .query({ token: verification?.token })
        .expect(200);

      // Check user is verified
      const updatedUser = await dataSource
        .getRepository(User)
        .findOne({ where: { email: 'test@example.com' } });

      expect(updatedUser?.emailVerified).toBe(true);
    });

    it('should return 400 when token is invalid', () => {
      return request(app.getHttpServer())
        .get('/api/v1/auth/verify-email')
        .query({ token: 'invalid-token' })
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toHaveProperty('code', 'TOKEN_INVALID');
        });
    });

    it('should return 400 when token is expired', async () => {
      // Register user
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: 'SecurePassword123!',
        })
        .expect(201);

      const user = await dataSource
        .getRepository(User)
        .findOne({ where: { email: 'test@example.com' } });

      const verification = await dataSource
        .getRepository(EmailVerification)
        .findOne({ where: { userId: user?.id } });

      // Manually expire the token
      await dataSource.getRepository(EmailVerification).update(verification?.id || '', {
        expiresAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      });

      // Try to verify with expired token
      return request(app.getHttpServer())
        .get('/api/v1/auth/verify-email')
        .query({ token: verification?.token })
        .expect(400)
        .expect((res) => {
          expect(res.body.error).toHaveProperty('code', 'TOKEN_INVALID');
        });
    });
  });

  describe('Full registration flow', () => {
    it('should complete full registration and verification flow', async () => {
      const email = 'fullflow@example.com';
      const password = 'SecurePassword123!';

      // Step 1: Register
      await request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({ email, password })
        .expect(201);

      // Step 2: Get verification token
      const user = await dataSource
        .getRepository(User)
        .findOne({ where: { email } });

      expect(user).toBeDefined();
      expect(user?.emailVerified).toBe(false);

      const verification = await dataSource
        .getRepository(EmailVerification)
        .findOne({ where: { userId: user?.id } });

      expect(verification).toBeDefined();

      // Step 3: Verify email
      await request(app.getHttpServer())
        .get('/api/v1/auth/verify-email')
        .query({ token: verification?.token })
        .expect(200);

      // Step 4: Confirm user is fully verified
      const verifiedUser = await dataSource
        .getRepository(User)
        .findOne({ where: { email } });

      expect(verifiedUser?.emailVerified).toBe(true);

      const updatedVerification = await dataSource
        .getRepository(EmailVerification)
        .findOne({ where: { id: verification?.id } });

      expect(updatedVerification?.verifiedAt).toBeInstanceOf(Date);
    });
  });
});
