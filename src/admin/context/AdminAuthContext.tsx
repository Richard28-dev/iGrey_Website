/**
 * iGREY HOLDINGS — Admin Authentication Context (Prototype Layer)
 * 
 * PROTOTYPE ARCHITECTURE NOTE:
 * Since there is no live backend/database service configured yet,
 * this authentication layer manages client-side session state for the prototype.
 * 
 * DEMO CREDENTIALS:
 * Email: admin@igreyholdings.com
 * Password: admin123
 * 
 * PRODUCTION ROADMAP:
 * To deploy securely to production:
 * 1. Replace the client-side login logic with a secure backend API endpoint (e.g. Supabase Auth,
 *    Firebase Auth, or Node.js / Express with HttpOnly JWT cookies).
 * 2. Never rely on frontend-only authorization checks. Validate all API requests via signed tokens.
 * 3. Store refresh tokens in HttpOnly, Secure, SameSite=Strict cookies to protect against XSS.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AdminUser } from '../types';

interface AuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string, rememberMe?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  requestPasswordReset: (email: string) => Promise<{ success: boolean; message: string }>;
}

const AUTH_STORAGE_KEY = 'igrey_admin_auth_user';
const REMEMBER_KEY = 'igrey_admin_auth_remember';

const DEFAULT_ADMIN: AdminUser = {
  id: 'usr-001',
  name: 'Richard Rodrigues',
  email: 'admin@igreyholdings.com',
  role: 'Super Admin',
  status: 'Active',
  lastLogin: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedLocal = localStorage.getItem(AUTH_STORAGE_KEY);
      const storedSession = sessionStorage.getItem(AUTH_STORAGE_KEY);
      const rawUser = storedLocal || storedSession;

      if (rawUser) {
        setUser(JSON.parse(rawUser));
      }
    } catch (err) {
      console.error('Failed to parse auth user session:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (
    email: string,
    pass: string,
    rememberMe = false
  ): Promise<{ success: boolean; error?: string }> => {
    // Artificial small latency to simulate authentication round-trip
    await new Promise((r) => setTimeout(r, 450));

    const cleanEmail = email.trim().toLowerCase();

    // Prototype validation
    if (!cleanEmail || !pass) {
      return { success: false, error: 'Please enter both your email and password.' };
    }

    // Allow default admin or any valid organization email for prototype testing
    if (
      (cleanEmail === 'admin@igreyholdings.com' && pass === 'admin123') ||
      (cleanEmail.endsWith('@igreyholdings.com') && pass.length >= 6) ||
      (cleanEmail === 'admin' && pass === 'admin')
    ) {
      const activeUser: AdminUser = {
        ...DEFAULT_ADMIN,
        email: cleanEmail.includes('@') ? cleanEmail : 'admin@igreyholdings.com',
        lastLogin: new Date().toISOString(),
      };

      setUser(activeUser);

      if (rememberMe) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(activeUser));
        localStorage.setItem(REMEMBER_KEY, 'true');
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
      } else {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(activeUser));
        localStorage.removeItem(AUTH_STORAGE_KEY);
        localStorage.removeItem(REMEMBER_KEY);
      }

      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. Use demo login: admin@igreyholdings.com / admin123',
    };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const requestPasswordReset = async (email: string) => {
    await new Promise((r) => setTimeout(r, 500));
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Please provide a valid registered email address.' };
    }
    return {
      success: true,
      message: `Password reset instructions have been dispatched to ${email}. (Prototype Notice: In production, a secure one-time token link is emailed).`,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return ctx;
};
