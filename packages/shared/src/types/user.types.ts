export type VerificationStatus = 'unverified' | 'phone_verified' | 'advanced_verified';

export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  phone: string | null;
  phoneVerified: boolean;
  verificationStatus: VerificationStatus;
  isExpert: boolean;
  reputationScore: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPublicProfile {
  id: string;
  email: string;
  isExpert: boolean;
  reputationScore: number;
  createdAt: Date;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
    timestamp: string;
    requestId: string;
  };
}
