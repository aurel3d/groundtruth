import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailVerificationService } from './email-verification.service';
import { PhoneVerificationService } from './phone-verification.service';
import { EmailVerification } from './entities/email-verification.entity';
import { PhoneVerification } from './entities/phone-verification.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([EmailVerification, PhoneVerification]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailVerificationService, PhoneVerificationService],
  exports: [AuthService],
})
export class AuthModule {}
