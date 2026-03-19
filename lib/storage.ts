'use client';

// Helper for generating unique IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Initial Data Seed
if (typeof window !== 'undefined' && !localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([
    {
      _id: 'doc1',
      name: 'Dr. Sarah Wilson',
      email: 'sarah@example.com',
      password: 'password',
      role: 'doctor',
      specialization: 'Cardiologist'
    },
    {
      _id: 'doc2',
      name: 'Dr. Michael Chen',
      email: 'michael@example.com',
      password: 'password',
      role: 'doctor',
      specialization: 'Neurologist'
    },
    {
      _id: 'doc3',
      name: 'Dr. Emily Brown',
      email: 'emily@example.com',
      password: 'password',
      role: 'doctor',
      specialization: 'Dermatologist'
    }
  ]));
}

// --- USERS ---
export const getUsers = () => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: any[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const findUserByEmail = (email: string) => {
  return getUsers().find((u: any) => u.email === email);
};

export const registerUser = (userData: any) => {
  const users = getUsers();
  if (users.find((u: any) => u.email === userData.email)) {
    throw new Error('User already exists');
  }
  const newUser = { 
    ...userData, 
    _id: generateId(),
    role: userData.role || 'patient' 
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
};

// --- AUTH SESSION ---
export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: any) => {
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

// --- DOCTORS ---
// Initialize with some default doctors if empty
export const getDoctors = () => {
  const users = getUsers();
  return users.filter((u: any) => u.role === 'doctor');
};

export const getAppointments = () => {
  if (typeof window === 'undefined') return [];
  const appointments = localStorage.getItem('appointments');
  return appointments ? JSON.parse(appointments) : [];
};

export const getAppointmentsByRole = (role: 'patient' | 'doctor', userId: string) => {
  const appointments = getAppointments();
  return appointments.filter((a: any) => 
    role === 'patient' ? a.patientId._id === userId : a.doctorId._id === userId
  ).sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const saveAppointments = (appointments: any[]) => {
  localStorage.setItem('appointments', JSON.stringify(appointments));
};

export const createAppointment = (appointmentData: any) => {
  const appointments = getAppointments();
  const newAppointment = {
    ...appointmentData,
    _id: generateId(),
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  // Basic double-booking check
  const conflict = appointments.find((a: any) => 
    a.doctorId === appointmentData.doctorId && 
    a.date === appointmentData.date && 
    a.timeSlot === appointmentData.timeSlot &&
    a.status !== 'cancelled'
  );

  if (conflict) {
    throw new Error('This time slot is already booked');
  }

  appointments.push(newAppointment);
  saveAppointments(appointments);
  return newAppointment;
};

export const updateAppointmentStatus = (id: string, status: string) => {
  const appointments = getAppointments();
  const updated = appointments.map((a: any) => 
    a._id === id ? { ...a, status } : a
  );
  saveAppointments(updated);
};

export const cancelAppointment = (id: string) => {
  const appointments = getAppointments();
  const updated = appointments.map((a: any) => 
    a._id === id ? { ...a, status: 'cancelled' } : a
  );
  saveAppointments(updated);
};
