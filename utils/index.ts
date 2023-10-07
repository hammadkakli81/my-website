import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export async function getUser(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  return { user: session?.user };
}

export async function requireUser(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await getUser(req, res);

  if (!user) throw new Error('Unauthenticated');
  return { user };
}

export async function requireAdmin(req: NextApiRequest, res: NextApiResponse) {
  const { user } = await getUser(req, res);

  if (!user) throw new Error('Unauthenticated');
  const isAdmin = user.role === 'admin';

  if (!isAdmin) throw new Error('Unauthorized');
  return { user };
}

export async function wait(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
