'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function ProtectedRoute({ children, role }: { children: React.ReactNode, role?: 'patient' | 'doctor' }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
    if (!loading && user && role && user.role !== role) {
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, loading, router, role]);

  if (loading) return <LoadingSpinner />;

  if (!user || (role && user.role !== role)) return null;

  return <>{children}</>;
}
