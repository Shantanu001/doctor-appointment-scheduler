'use client';

import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center pt-24 pb-16 px-4 bg-slate-50 dark:bg-slate-950">
        {user ? (
          // Authenticated State - Personalized Hero
          <div className="max-w-4xl w-full text-center space-y-10 animate-in fade-in zoom-in duration-700">
            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-100 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-xs font-bold tracking-wider uppercase mb-2">
              Welcome back, {user.name}
            </div>

            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              Manage Your Health <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent italic">Right Here</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-4">
              <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none text-left flex flex-col justify-between group hover:border-blue-500 transition-all cursor-pointer">
                <div>
                  <h3 className="text-xl font-bold dark:text-white mb-2">Quick Access</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Jump straight to your {user.role} dashboard to manage appointments.</p>
                </div>
                <Link
                  href={`/dashboard/${user.role}`}
                  className="mt-6 inline-flex items-center text-blue-600 dark:text-blue-400 font-bold group-hover:gap-2 transition-all"
                >
                  Go to Dashboard
                  <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </Link>
              </div>

              <div className="p-6 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-500/30 text-left text-white flex flex-col justify-between group hover:scale-[1.02] transition-transform">
                <div>
                  <h3 className="text-xl font-extrabold mb-2">Quick Status</h3>
                  <p className="text-indigo-100 text-sm">Logged in as a <span className="font-bold underline decoration-2 underline-offset-4 decoration-white/50 capitalize">{user.role}</span>.</p>
                </div>
                <p className="mt-6 text-2xl font-black text-white/95">Active Session</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm font-medium pt-8">
              Logged in successfully. Use the navigation to find your specific tools.
            </p>
          </div>
        ) : (
          // Unauthenticated State - Original Landing
          <div className="max-w-4xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-1000 fill-mode-both">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4">
              New Era of Healthcare Management
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Schedule Your Health <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent italic">With Confidence</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              A seamless bridge between patients and healthcare professionals. Book appointments in seconds, manage your health records, and connect with top-rated specialists.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link
                href="/auth/register"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-lg transition-all shadow-xl shadow-blue-500/25 transform hover:-translate-y-1"
              >
                Get Started for Free
              </Link>
              <Link
                href="/auth/login"
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-xl font-semibold text-lg transition-all hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm"
              >
                Partner Sign-In
              </Link>
            </div>
          </div>
        )}

        {/* Feature Highlights (Visible to both, but could be conditional) */}
        {!user && (
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:border-blue-200 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Easy Scheduling</h3>
              <p className="text-slate-600 dark:text-slate-400">Instantly browse doctor availability and book your next appointment without the phone tag.</p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:border-blue-200 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Expert Doctors</h3>
              <p className="text-slate-600 dark:text-slate-400">Connect with validated medical professionals across a wide spectrum of specializations.</p>
            </div>

            <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none hover:border-blue-200 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04 inter M12 21.48V22" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">Secure Data</h3>
              <p className="text-slate-600 dark:text-slate-400">Your health records and personal information are encrypted and handled with the highest security.</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm italic">
            © 2026 VyrloConnect Healthcare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
