import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerification } from './entities/email-verification.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([EmailVerification]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, EmailVerificationService],
  exports: [AuthService],
})
export class AuthModule {}
