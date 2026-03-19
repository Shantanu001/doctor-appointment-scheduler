import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DB_PATH = path.join(process.cwd(), 'db.json');

// Initial schema
const INITIAL_DATA = {
  users: [],
  appointments: []
};

function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(INITIAL_DATA, null, 2));
    return INITIAL_DATA;
  }
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

function writeDb(data: any) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Mock Mongoose-like models
const createQueryChain = (data: any) => {
  const chain = Promise.resolve(data) as any;
  chain.populate = () => chain;
  chain.select = () => chain;
  chain.sort = () => chain;
  chain.lean = () => chain;
  chain.exec = () => chain;
  return chain;
};

export const User = {
  async findOne(query: any) {
    const db = readDb();
    const result = db.users.find((u: any) => {
      for (let key in query) {
        if (u[key] !== query[key]) return false;
      }
      return true;
    });
    return result;
  },
  find(query: any = {}) {
    const db = readDb();
    const results = db.users.filter((u: any) => {
      for (let key in query) {
        if (u[key] !== query[key]) return false;
      }
      return true;
    });
    return createQueryChain(results);
  },
  async create(data: any) {
    const db = readDb();
    const newUser = { ...data, _id: crypto.randomUUID(), createdAt: new Date() };
    db.users.push(newUser);
    writeDb(db);
    return newUser;
  }
};

export const Appointment = {
  find(query: any = {}) {
    const db = readDb();
    let results = db.appointments.filter((a: any) => {
      if (query.patientId && a.patientId !== query.patientId) return false;
      if (query.doctorId && a.doctorId !== query.doctorId) return false;
      return true;
    });
    
    // Simulate population for the results
    const populated = results.map((a: any) => ({
      ...a,
      patientId: db.users.find((u: any) => u._id === a.patientId) || { name: 'Unknown' },
      doctorId: db.users.find((u: any) => u._id === a.doctorId) || { name: 'Unknown' }
    }));
    
    return createQueryChain(populated);
  },
  async findOne(query: any) {
    const db = readDb();
    return db.appointments.find((a: any) => {
      for (let key in query) {
        if (a[key] !== query[key]) return false;
      }
      return true;
    });
  },
  async create(data: any) {
    const db = readDb();
    const newAppointment = { ...data, _id: crypto.randomUUID(), createdAt: new Date(), status: data.status || 'pending' };
    db.appointments.push(newAppointment);
    writeDb(db);
    return newAppointment;
  },
  async findById(id: string) {
    const db = readDb();
    const appointment = db.appointments.find((a: any) => a._id === id);
    if (!appointment) return null;
    return {
      ...appointment,
      save: async function() {
        const index = db.appointments.findIndex((a: any) => a._id === id);
        const { save, ...rest } = this as any;
        db.appointments[index] = rest;
        writeDb(db);
      }
    };
  },
  async findByIdAndDelete(id: string) {
    const db = readDb();
    db.appointments = db.appointments.filter((a: any) => a._id !== id);
    writeDb(db);
  }
};

export async function dbConnect() {
  // No-op for mock
  return true;
}
