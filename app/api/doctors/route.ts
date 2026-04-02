import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET() {
  try {
    await dbConnect();
    const doctors = await User.find({ role: 'doctor' }).select('name specialization email');
    return NextResponse.json({ doctors }, { status: 200 });
  } catch (error) {
    console.error('Fetch doctors error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
