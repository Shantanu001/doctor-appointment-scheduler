import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import { getUser } from '@/lib/getUser';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();
    const { id } = params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Permission check
    if ((user as any).role === 'patient' && appointment.patientId.toString() !== (user as any).id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    if ((user as any).role === 'doctor' && appointment.doctorId.toString() !== (user as any).id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Doctors can update status
    if ((user as any).role === 'doctor') {
      if (body.status) {
        appointment.status = body.status;
      }
    }

    // Patients can update date/time (reschedule) or notes
    if ((user as any).role === 'patient') {
      if (body.date) appointment.date = body.date;
      if (body.timeSlot) appointment.timeSlot = body.timeSlot;
      if (body.notes) appointment.notes = body.notes;
    }

    await appointment.save();

    return NextResponse.json({ appointment }, { status: 200 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'This time slot is already booked.' }, { status: 400 });
    }
    console.error('Update appointment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getUser();
    if (!user || (user as any).role !== 'patient') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const { id } = params;

    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    if (appointment.patientId.toString() !== (user as any).id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await Appointment.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Appointment cancelled successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete appointment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
