import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },
    timeSlot: {
      type: String, // HH:MM
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index for double-booking prevention: a doctor can't have two appointments at the same time on the same date.
AppointmentSchema.index({ doctorId: 1, date: 1, timeSlot: 1 }, { unique: true });

export default mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
