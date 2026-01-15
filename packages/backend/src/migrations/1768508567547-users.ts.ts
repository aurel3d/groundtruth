import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1768508567547 implements MigrationInterface {
  name = 'Users1768508567547';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Needed for gen_random_uuid() on Postgres
    await queryRunner.query(`
      CREATE EXTENSION IF NOT EXISTS pgcrypto;
    `);

    // Create users table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) UNIQUE NOT NULL,
          email_verified BOOLEAN DEFAULT FALSE NOT NULL,
          phone VARCHAR(20) UNIQUE,
          phone_verified BOOLEAN DEFAULT FALSE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          verification_status VARCHAR(50) DEFAULT 'unverified' NOT NULL
              CHECK (verification_status IN ('unverified', 'phone_verified', 'advanced_verified')),
          is_expert BOOLEAN DEFAULT FALSE NOT NULL,
          reputation_score INTEGER DEFAULT 0 NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // Indexes on users
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone ON users(phone) WHERE phone IS NOT NULL;
    `);

    // Create email_verifications table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS email_verifications (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          token VARCHAR(255) UNIQUE NOT NULL,
          expires_at TIMESTAMP NOT NULL,
          verified_at TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    // Indexes on email_verifications
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON email_verifications(token);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_email_verifications_user_id ON email_verifications(user_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes first (optional, but explicit)
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_email_verifications_user_id;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_email_verifications_token;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_users_phone;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_users_email;
    `);

    // Drop tables (email_verifications first because it references users)
    await queryRunner.query(`
      DROP TABLE IF EXISTS email_verifications CASCADE;
    `);

    await queryRunner.query(`
      DROP TABLE IF EXISTS users CASCADE;
    `);

    // Usually we do NOT drop extensions in down(), because it may be shared by other migrations/apps
    // await queryRunner.query(`DROP EXTENSION IF EXISTS pgcrypto;`);
  }
}
