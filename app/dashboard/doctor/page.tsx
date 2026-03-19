'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import AppointmentCard from '@/components/AppointmentCard';

import { useAuth } from '@/context/AuthContext';
import { getAppointmentsByRole } from '@/lib/storage';

export default function DoctorDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(() => {
    if (!user) return;
    try {
      const appData = getAppointmentsByRole('doctor', user._id);
      setAppointments(appData as any);
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
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Doctor Dashboard</h1>
            <p className="text-slate-500 mt-1">Overview of your patient appointments and requests.</p>
          </div>

          {/* Stats Bento Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Requests</p>
              <p className="text-4xl font-black text-slate-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="p-6 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30 shadow-sm">
              <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-1">Pending Approval</p>
              <p className="text-4xl font-black text-amber-600 dark:text-amber-500">{stats.pending}</p>
            </div>
            <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/30 shadow-sm">
              <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Confirmed Today</p>
              <p className="text-4xl font-black text-emerald-600 dark:text-emerald-500">{stats.confirmed}</p>
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
