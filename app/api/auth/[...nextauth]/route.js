
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

      const username =
        profile?.login ||
        email.split("@")[0] ||
        user.name?.replace(/\s+/g, "").toLowerCase();


      let existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (!existingUser) {

        await User.create({
          name: user.name,
          email,
          username,
          profilepic: user.image || "",
        });
        user.isNewUser = true;
      } else {

        if (user.image && !existingUser.profilepic) {
          existingUser.profilepic = user.image;
          await existingUser.save();
        }

        if (
          existingUser.email.endsWith("@github.com") &&
          user.email &&
          !user.email.endsWith("@github.com")
        ) {
          existingUser.email = user.email;
          await existingUser.save();
        }
        user.isNewUser = false;
      }

      return true;
    },

    async jwt({ token, user, profile }) {

      if (user) {
        const email =
          user.email ||
          profile?.email ||
          `${profile?.login}@github.com`;
        token.email = email;
        token.username =
          profile?.login ||
          email.split("@")[0] ||
          user.name?.replace(/\s+/g, "").toLowerCase();
        token.isNewUser = user.isNewUser;
      }
      return token;
    },

    async session({ session, token }) {
      await connectDB();


      const searchEmail = token.email || session.user.email;
      const searchUsername = token.username;


      const dbUser = await User.findOne({
        $or: [
          ...(searchEmail ? [{ email: searchEmail }] : []),
          ...(searchUsername ? [{ username: searchUsername }] : []),
        ],
      });

      if (dbUser) {
        session.user.id = dbUser._id;
        session.user.username = dbUser.username;
        session.user.profilepic = dbUser.profilepic;
        session.user.email = dbUser.email;
        session.user.isNewUser = token.isNewUser;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
