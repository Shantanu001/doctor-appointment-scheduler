'use client';

import { useState } from 'react';
import StatusBadge from './StatusBadge';
import toast from 'react-hot-toast';

import { updateAppointmentStatus, cancelAppointment as cancelStorageAppointment } from '@/lib/storage';

export default function AppointmentCard({ 
  appointment, 
  role, 
  onRefresh 
}: { 
  appointment: any, 
  role: 'patient' | 'doctor',
  onRefresh: () => void 
}) {
  const isDoctor = role === 'doctor';
  const otherParty = isDoctor ? appointment.patientId : appointment.doctorId;
  const [showConfirm, setShowConfirm] = useState(false);

  const updateStatus = (newStatus: string) => {
    try {
      updateAppointmentStatus(appointment._id, newStatus);
      toast.success(`Appointment ${newStatus}`);
      onRefresh();
    } catch (error) {
      toast.error('An error occurred');
    }
  };

  const cancelAppointment = () => {
    try {
      cancelStorageAppointment(appointment._id);
      toast.success('Appointment cancelled');
      onRefresh();
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setShowConfirm(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 font-bold overflow-hidden">
            {otherParty.name ? otherParty.name[0] : '?'}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">{otherParty.name || 'Unknown User'}</h4>
            <p className="text-xs text-slate-500 font-medium italic">
              {isDoctor ? 'Patient' : (otherParty.specialization || 'Doctor')}
            </p>
          </div>
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 dark:border-slate-800 mb-4">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          {appointment.date}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {appointment.timeSlot}
        </div>
      </div>

      {appointment.notes && (
        <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800/30 rounded-xl text-xs text-slate-500 italic border border-slate-100 dark:border-slate-800">
          &quot;{appointment.notes}&quot;
        </div>
      )}

      <div className="flex gap-2">
        {isDoctor && appointment.status === 'pending' && (
          <>
            <button 
              onClick={() => updateStatus('confirmed')}
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-500/10 active:scale-95"
            >
              Confirm
            </button>
            <button 
              onClick={() => updateStatus('cancelled')}
              className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-bold hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95"
            >
              Reject
            </button>
          </>
        )}

        {!isDoctor && appointment.status !== 'cancelled' && (
          showConfirm ? (
            <div className="flex w-full gap-2 animate-in zoom-in-95 duration-200">
              <button 
                onClick={cancelAppointment}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all"
              >
                Confirm Cancel
              </button>
              <button 
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-xs font-bold transition-all"
              >
                Go Back
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowConfirm(true)}
              className="w-full py-2.5 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-xl text-xs font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-95"
            >
              Cancel Appointment
            </button>
          )
        )}
      </div>
    </div>
  );
}
