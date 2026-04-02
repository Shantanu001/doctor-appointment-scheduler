import { cookies } from 'next/headers';
import { verifyToken } from './jwt';

export async function getUser() {
  const token = cookies().get('token')?.value;

  if (!token) {
    return null;
  }

  const decoded = await verifyToken(token);
  return decoded;
}
