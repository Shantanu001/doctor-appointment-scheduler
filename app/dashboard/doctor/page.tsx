'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import AppointmentCard from '@/components/AppointmentCard';

import { useAuth } from '@/context/AuthContext';
export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a: any) => a.status === 'pending').length,
    confirmed: appointments.filter((a: any) => a.status === 'confirmed').length,
  };

  return (
    <ProtectedRoute role="doctor">
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter mb-2">Doctor's Command Center</h1>
              <p className="text-slate-500 dark:text-slate-400 font-medium">Welcome back, Dr. {user?.name}. You have {stats.pending} pending requests that need your immediate attention.</p>
            </div>
            <div className="hidden lg:flex items-center gap-4 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-black">DR</div>
              <div className="pr-4 leading-none">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Medical Board</p>
                <p className="text-sm font-bold dark:text-white">Active Status</p>
              </div>
            </div>
          </div>

          {/* Premium Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="relative p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden group">
              <div className="relative z-10">
                <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] mb-4">Total Patient Requests</p>
                <p className="text-6xl font-black text-slate-900 dark:text-white mb-2">{stats.total}</p>
                <p className="text-sm text-slate-500 font-medium italic">Overview of all time bookings</p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            </div>

            <div className="relative p-8 bg-amber-500 rounded-[2.5rem] shadow-xl shadow-amber-500/30 overflow-hidden text-white group hover:scale-[1.02] transition-transform">
              <div className="relative z-10">
                <p className="text-[10px] font-black text-amber-100 uppercase tracking-[0.2em] mb-4">Awaiting Decision</p>
                <p className="text-6xl font-black mb-2">{stats.pending}</p>
                <p className="text-sm text-amber-100 font-medium">Requires approval or rejection</p>
              </div>
              <div className="absolute top-4 right-8 opacity-20 transform rotate-12 transition-transform group-hover:rotate-45">
                 <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
            </div>

            <div className="relative p-8 bg-indigo-600 rounded-[2.5rem] shadow-xl shadow-indigo-600/30 overflow-hidden text-white group hover:scale-[1.02] transition-transform">
              <div className="relative z-10">
                <p className="text-[10px] font-black text-indigo-100 uppercase tracking-[0.2em] mb-4">Confirmed Schedules</p>
                <p className="text-6xl font-black mb-2">{stats.confirmed}</p>
                <p className="text-sm text-indigo-100 font-medium italic">Active medical appointments</p>
              </div>
               <div className="absolute -left-10 -top-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
              <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </span>
              Incoming Appointments
            </h2>

            {loading ? (
              <LoadingSpinner />
            ) : appointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
                {appointments.map((app: any) => (
                  <AppointmentCard 
                    key={app._id} 
                    appointment={app} 
                    role="doctor" 
                    onRefresh={fetchData} 
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-20 text-center">
                <div className="mx-auto w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <p className="text-slate-400 font-medium text-lg">Your schedule is currently empty.</p>
                <p className="text-sm text-slate-500 mt-2">New appointment requests will appear here once patients book you.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
