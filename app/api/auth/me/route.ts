import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { getUser } from '@/lib/getUser';

export async function GET() {
  try {
    const decoded = await getUser();

    if (!decoded) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    await dbConnect();
    const user = await User.findById((decoded as any).id).select('-password');

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role, specialization: user.specialization } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
  }
}
