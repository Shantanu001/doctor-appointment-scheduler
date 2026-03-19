import { NextResponse } from 'next/server';
import { dbConnect, Appointment } from '@/lib/mockDb';
import { getUser } from '@/lib/getUser';
import { appointmentSchema } from '@/lib/validations';

export async function GET() {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    let query = {};
    if ((user as any).role === 'patient') {
      query = { patientId: (user as any).id };
    } else {
      query = { doctorId: (user as any).id };
    }

    const appointments = await Appointment.find(query)
      .populate('patientId', 'name email')
      .populate('doctorId', 'name email specialization')
      .sort({ date: 1, timeSlot: 1 });

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error('Fetch appointments error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const user = await getUser();
    if (!user || (user as any).role !== 'patient') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const body = await req.json();

    const result = appointmentSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const { doctorId, date, timeSlot, notes } = result.data;

    // Double-booking check (though handled by DB index, good to check explicitly for better error message)
    const existing = await Appointment.findOne({ doctorId, date, timeSlot });
    if (existing) {
      return NextResponse.json({ error: 'This time slot is already booked for this doctor.' }, { status: 400 });
    }

    const appointment = await Appointment.create({
      patientId: (user as any).id,
      doctorId,
      date,
      timeSlot,
      notes,
    });

    return NextResponse.json({ appointment }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'This time slot is already booked.' }, { status: 400 });
    }
    console.error('Create appointment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
