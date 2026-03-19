'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import LoadingSpinner from '@/components/LoadingSpinner';
import DoctorCard from '@/components/DoctorCard';
import BookingModal from '@/components/BookingModal';
import AppointmentCard from '@/components/AppointmentCard';

import { useAuth } from '@/context/AuthContext';
import { getAppointmentsByRole, getDoctors } from '@/lib/storage';

export default function PatientDashboard() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const fetchData = useCallback(() => {
    if (!user) return;
    try {
      const appData = getAppointmentsByRole('patient', user._id);
      const docData = getDoctors();
      setAppointments(appData as any);
      setDoctors(docData as any);
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
            {/* Appointments Column */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 dark:text-white">
                <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                </span>
                Your Appointments
              </h2>

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
