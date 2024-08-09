import { IUser } from './models/comment'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: IUser;
  }
}
