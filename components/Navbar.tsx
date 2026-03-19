'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Don't show navbar on auth pages if preferred, or keep it simple
  const isAuthPage = pathname.startsWith('/auth');

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              DocSchedule
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  href={`/dashboard/${user.role}`}
                  className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </Link>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
                <span className="text-sm text-slate-500 truncate max-w-[100px]">
                  Hi, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-100 transition-all border border-red-100"
                >
                  Logout
                </button>
              </>
            ) : (
              !isAuthPage && (
                <>
                  <Link href="/auth/login" className="text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600">
                    Login
                  </Link>
                  <Link 
                    href="/auth/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20"
                  >
                    Get Started
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
