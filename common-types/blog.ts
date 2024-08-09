import { IUser } from '@/models/comment';

export interface Blog {
  _id: string;
  title: string;
  content: string;
  slug: string;
  tags: string;
  meta: string;
  thumbnail?: { src: string; public_id: string };
  author: IUser;
  createdAt: string;
  updatedAt: string;
}
