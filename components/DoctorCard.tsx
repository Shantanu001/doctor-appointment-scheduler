export default function DoctorCard({ doctor, onBook }: { doctor: any, onBook: (doctor: any) => void }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-xl group-hover:scale-110 transition-transform">
          {doctor.name[0]}
        </div>
        <div className="px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-500 rounded text-[10px] font-bold uppercase tracking-tighter">
          Verified
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{doctor.name}</h3>
      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-4">{doctor.specialization}</p>
      
      <div className="space-y-2 mb-6 text-sm text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          {doctor.email}
        </div>
      </div>
      
      <button 
        onClick={() => onBook(doctor)}
        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition-all active:scale-95"
      >
        Book Appointment
      </button>
    </div>
  );
}
