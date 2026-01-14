-- Migration: 001_users_table
-- Description: Create users and email_verifications tables
-- Author: Dev Agent (Amelia)
-- Date: 2026-01-14

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE NOT NULL,
    phone VARCHAR(20) UNIQUE,
    phone_verified BOOLEAN DEFAULT FALSE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    verification_status VARCHAR(50) DEFAULT 'unverified' NOT NULL CHECK (verification_status IN ('unverified', 'phone_verified', 'advanced_verified')),
    is_expert BOOLEAN DEFAULT FALSE NOT NULL,
    reputation_score INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create indexes on users table
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_phone ON users(phone) WHERE phone IS NOT NULL;

-- Create email_verifications table
CREATE TABLE IF NOT EXISTS email_verifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    verified_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create index on email_verifications
CREATE INDEX IF NOT EXISTS idx_email_verifications_token ON email_verifications(token);
CREATE INDEX IF NOT EXISTS idx_email_verifications_user_id ON email_verifications(user_id);

-- ROLLBACK SCRIPT
-- To revert this migration, run:
-- DROP TABLE IF EXISTS email_verifications CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
