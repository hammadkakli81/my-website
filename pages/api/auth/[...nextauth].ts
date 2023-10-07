import { User } from '@/models/comment';
import { connectDB } from '@/utils/connect-db';
import { type AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: AuthOptions = {
  session: { strategy: 'jwt' },
  secret: process.env.JWT_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile, tokens) {
        const { name, email, picture } = profile;

        // find the user in db
        await connectDB();

        let previousUser = await User.findOne({ email });

        const userFromGoogle = {
          name: name,
          email,
          avatar: picture,
        };

        if (
          previousUser &&
          (userFromGoogle.name !== previousUser.name ||
            userFromGoogle.email !== previousUser.email ||
            userFromGoogle.avatar !== previousUser.avatar)
        ) {
          // things might have been updated from the past
          await previousUser.updateOne(userFromGoogle);
        }

        if (!previousUser) {
          const u: any = userFromGoogle;

          if (process.env.ADMIN?.split(' ').includes(u.email)) u.role = 'admin';

          let user = await User.create(u);
          user = user.toJSON();
          return createProfile(profile, user);
        }

        previousUser = previousUser.toJSON();
        console.log('🚀🚀🚀', previousUser);

        // this content will be provided to 'jwt' callback as 'user' property
        return createProfile(profile, previousUser);
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      // this will be called, when first time user is logged in.

      // 'profile' that is passed in this method is 'profile' that is returned from github api

      // this user is what that was returned from 'profile' method, if this is not the callback that is called on first signin, only token will be available

      // when this is called on 'useSession' or 'getSession' old token returned, new token is not created because user is not defined
      if (user) {
        return createTokenWithUserId(token, user);
      }

      return token;
    },
    async session({ session, token }) {
      // every time useSession is called
      await connectDB();
      const sessionUser = await User.findById((token as any).userId);

      if (!sessionUser) throw new Error('User not found');

      session.user = sessionUser?.toJSON();
      return session;
    },
  },
};

export function createProfile(profile: any, user: any) {
  return {
    id: profile.sub,
    userId: user.id,
    role: user.role,
  };
}

export function createTokenWithUserId(token: any, user: any) {
  const anyUser: any = user;
  token.role = anyUser.role;
  token.userId = anyUser.userId;

  return token;
}

export default NextAuth(authOptions);
