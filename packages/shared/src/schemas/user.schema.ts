import { z } from 'zod';

/**
 * Password validation schema
 * Requirements:
 * - Minimum 12 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one symbol
 */
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+=\-[\]{}|\\:;"'<>,.~/`])[A-Za-z\d@$!%*?&#^()_+=\-[\]{}|\\:;"'<>,.~/`]{12,}$/;

export const RegistrationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(12, { message: 'Password must be at least 12 characters long' })
    .regex(passwordRegex, {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol',
    }),
});

export type Registration = z.infer<typeof RegistrationSchema>;

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email format' })
    .toLowerCase()
    .trim(),
  password: z.string().min(1, { message: 'Password is required' }),
});

export type Login = z.infer<typeof LoginSchema>;

export const EmailVerificationSchema = z.object({
  token: z.string().min(1, { message: 'Token is required' }),
});

export type EmailVerification = z.infer<typeof EmailVerificationSchema>;

export const PhoneSetupSchema = z.object({
  phone: z
    .string()
    .regex(/^\+[1-9]\d{1,14}$/, {
      message: 'Phone number must be in E.164 format (e.g., +14155552671)',
    })
    .trim(),
});

export type PhoneSetup = z.infer<typeof PhoneSetupSchema>;
