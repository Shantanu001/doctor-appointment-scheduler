import { NextResponse } from 'next/server';
import { dbConnect, User } from '@/lib/mockDb';
import { getUser } from '@/lib/getUser';

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching user' }, { status: 500 });
  }
}
