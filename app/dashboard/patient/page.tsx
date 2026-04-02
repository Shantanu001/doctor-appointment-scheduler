'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import DoctorCard from '@/components/DoctorCard';
import BookingModal from '@/components/BookingModal';
import AppointmentCard from '@/components/AppointmentCard';

import { useAuth } from '@/context/AuthContext';
export default function PatientDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const fetchData = useCallback(async () => {
    if (!user) return;
    try {
      const [appRes, docRes] = await Promise.all([
        fetch('/api/appointments'),
        fetch('/api/doctors')
      ]);
      const appData = await appRes.json();
      const docData = await docRes.json();
      
      setAppointments(appData.appointments || []);
      setDoctors(docData.doctors || []);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ProtectedRoute role="patient">
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Patient Dashboard</h1>
              <p className="text-slate-500 mt-1">Manage your medical appointments and find experts.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Health Overview / Stats Card */}
            <div className="lg:col-span-3">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white shadow-2xl shadow-blue-500/30 relative overflow-hidden group border border-white/10 hover:shadow-blue-500/40 transition-all duration-500">
                <div className="relative z-10 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
                  <div>
                    <h2 className="text-3xl font-black mb-2 animate-in slide-in-from-left-4 duration-500">Your Health Hub</h2>
                    <p className="text-white/85 font-medium max-w-md">Everything you need to manage your personal medical journey in one central place.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:flex gap-4 items-end">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/20 transition-all min-w-[120px] transform hover:scale-105 duration-300">
                      <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Bookings</p>
                      <p className="text-3xl font-black">{appointments.length}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 hover:bg-white/20 transition-all min-w-[120px] transform hover:scale-105 duration-300">
                      <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">Confirmed</p>
                      <p className="text-3xl font-black">{appointments.filter((a: any) => a.status === 'confirmed').length}</p>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/5 opacity-50 hidden lg:block">
                      <p className="text-white/40 text-[8px] font-black uppercase tracking-tighter mb-1">Patient Role</p>
                      <div className="w-8 h-8 rounded-full bg-blue-500 animate-pulse" />
                    </div>
                  </div>
                </div>
                {/* Visual Flair */}
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 ease-in-out" />
                <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-indigo-400/20 rounded-full blur-2xl group-hover:bg-indigo-300/30 transition-all duration-1000" />
              </div>
            </div>

            {/* Appointments Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black flex items-center gap-2 dark:text-white group">
                  <span className="w-10 h-10 rounded-xl bg-blue-600 dark:bg-blue-600 text-white flex items-center justify-center text-lg shadow-lg group-hover:rotate-6 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </span>
                  Your Upcoming Appointments
                </h2>
                <div className="h-0.5 flex-grow bg-slate-100 dark:bg-slate-800 mx-4 hidden sm:block" />
              </div>

              {loading ? (
                <LoadingSpinner />
              ) : appointments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
                  {appointments.map((app: any) => (
                    <AppointmentCard 
                      key={app._id} 
                      appointment={app} 
                      role="patient" 
                      onRefresh={fetchData} 
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center">
                  <p className="text-slate-400 font-medium">No appointments scheduled yet.</p>
                  <p className="text-xs text-slate-500 mt-2 italic">Book a doctor from the right panel to get started.</p>
                </div>
              )}
            </div>

            {/* Doctors Column */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
                <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                </span>
                Find a Specialist
              </h2>
              
              <div className="space-y-4">
                {doctors.map((doctor: any) => (
                  <DoctorCard 
                    key={doctor._id} 
                    doctor={doctor} 
                    onBook={(doc) => setSelectedDoctor(doc)} 
                  />
                ))}
              </div>
            </div>
          </div>
        </main>

        <BookingModal 
          doctor={selectedDoctor} 
          isOpen={!!selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
          onSuccess={fetchData} 
        />
      </div>
    </ProtectedRoute>
  );
}
