
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, profile }) {
      await connectDB();

      const email =
        user.email ||
        profile?.email ||
        `${profile?.login}@github.com`;

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        const username =
          profile?.login ||
          email.split("@")[0] ||
          user.name?.replace(/\s+/g, "").toLowerCase();

        await User.create({
          name: user.name,
          email,
          username,
          profilepic: user.image,
        });
      }

      return true;
    },

    async session({ session }) {
      await connectDB();

      const dbUser = await User.findOne({
        email: session.user.email,
      });

      if (dbUser) {
        session.user.id = dbUser._id;
        session.user.username = dbUser.username;
      }

      return session;
    },
  },


  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
