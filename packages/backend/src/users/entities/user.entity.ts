import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { VerificationStatus } from '@groundtruth/shared';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ unique: true })
  @Index('idx_users_email')
  email!: string;

  @Column({ name: 'email_verified', default: false })
  emailVerified!: boolean;

  @Column({ nullable: true, unique: true })
  @Index('idx_users_phone')
  phone!: string | null;

  @Column({ name: 'phone_verified', default: false })
  phoneVerified!: boolean;

  @Column({ name: 'password_hash', select: false })
  passwordHash!: string;

  @Column({
    name: 'verification_status',
    type: 'varchar',
    default: 'unverified',
  })
  verificationStatus!: VerificationStatus;

  @Column({ name: 'is_expert', default: false })
  isExpert!: boolean;

  @Column({ name: 'reputation_score', default: 0 })
  reputationScore!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
