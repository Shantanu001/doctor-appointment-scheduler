import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await dbConnect();
    const doctors = await User.find({ role: 'doctor' }).select('name specialization email');
    console.log(`Fetch doctors: found ${doctors.length} results`);
    return NextResponse.json({ doctors }, { status: 200 });
  } catch (error) {
    console.error('Fetch doctors error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
