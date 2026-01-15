import { MigrationInterface, QueryRunner } from 'typeorm';

export class PhoneVerifications1768594960000 implements MigrationInterface {
  name = 'PhoneVerifications1768594960000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Needed for gen_random_uuid() on Postgres
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS pgcrypto;
    `);

    // Create phone_verifications table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS phone_verifications (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          phone VARCHAR(20) NOT NULL,
          code VARCHAR(255) NOT NULL,
          expires_at TIMESTAMP NOT NULL,
          verified_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // Indexes for efficient lookups
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_phone_verifications_phone
      ON phone_verifications(phone);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_phone_verifications_user_id
      ON phone_verifications(user_id);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_phone_verifications_expires_at
      ON phone_verifications(expires_at);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes first (explicit and safe)
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_phone_verifications_expires_at;
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_phone_verifications_user_id;
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_phone_verifications_phone;
    `);

    // Drop table
    await queryRunner.query(`
      DROP TABLE IF EXISTS phone_verifications CASCADE;
    `);

    // Do not drop pgcrypto extension (may be shared)
  }
}
