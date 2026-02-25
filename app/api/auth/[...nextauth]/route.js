
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

      // Build a reliable email (GitHub users may not have a public email)
      const email =
        user.email ||
        profile?.email ||
        `${profile?.login}@github.com`;

      const username =
        profile?.login ||
        email.split("@")[0] ||
        user.name?.replace(/\s+/g, "").toLowerCase();

      // Try to find user by email OR username
      let existingUser = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (!existingUser) {
        // Create new user
        await User.create({
          name: user.name,
          email,
          username,
          profilepic: user.image || "",
        });
      } else {
        // Update profile pic from OAuth on every login (keeps it current)
        if (user.image && !existingUser.profilepic) {
          existingUser.profilepic = user.image;
          await existingUser.save();
        }
        // Also update email if it was a placeholder before
        if (
          existingUser.email.endsWith("@github.com") &&
          user.email &&
          !user.email.endsWith("@github.com")
        ) {
          existingUser.email = user.email;
          await existingUser.save();
        }
      }

      return true;
    },

    async jwt({ token, user, profile }) {
      // On first sign-in, attach the resolved email and username to the token
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
      }
      return token;
    },

    async session({ session, token }) {
      await connectDB();

      // Use the token email (which is the resolved one from signIn)
      const searchEmail = token.email || session.user.email;
      const searchUsername = token.username;

      // Find user by email OR username (handles GitHub edge cases)
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
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
