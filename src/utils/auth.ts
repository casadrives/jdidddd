import { emailService } from '../services/emailService';

export async function sendResetLink(email: string): Promise<void> {
  try {
    // Generate reset token (in production, this would be a secure token)
    const resetToken = Math.random().toString(36).substring(7);
    
    // Store token in database with expiration (in production)
    // await storeResetToken(email, resetToken);
    
    // Send reset email
    await emailService.sendEmail({
      to: email,
      subject: 'Reset Your CasaDrive Password',
      html: `
        <h2>Reset Your Password</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${window.location.origin}/reset-password?token=${resetToken}">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
      from: 'noreply@casadrive.com'
    });
  } catch (error) {
    console.error('Error sending reset link:', error);
    throw new Error('Failed to send password reset link');
  }
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  try {
    // Verify token and update password (in production)
    // await verifyTokenAndUpdatePassword(token, newPassword);
    
    // For demo, simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, this would:
    // 1. Verify the token is valid and not expired
    // 2. Hash the new password
    // 3. Update the user's password in the database
    // 4. Invalidate the reset token
    // 5. Send confirmation email
  } catch (error) {
    console.error('Error resetting password:', error);
    throw new Error('Failed to reset password');
  }
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    return 'Password must contain at least one special character (!@#$%^&*)';
  }
  
  return null;
}