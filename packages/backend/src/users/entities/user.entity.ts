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

  @Column({ type: 'varchar', unique: true })
  @Index('idx_users_email')
  email!: string;

  @Column({ type: 'boolean', name: 'email_verified', default: false })
  emailVerified!: boolean;

  @Column({ type: 'varchar', nullable: true, unique: true })
  @Index('idx_users_phone')
  phone!: string | null;

  @Column({ type: 'boolean', name: 'phone_verified', default: false })
  phoneVerified!: boolean;

  @Column({ type: 'varchar', name: 'password_hash', select: false })
  passwordHash!: string;

  @Column({
    name: 'verification_status',
    type: 'varchar',
    default: 'unverified',
  })
  verificationStatus!: VerificationStatus;

  @Column({ type: 'boolean', name: 'is_expert', default: false })
  isExpert!: boolean;

  @Column({ type: 'int', name: 'reputation_score', default: 0 })
  reputationScore!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
