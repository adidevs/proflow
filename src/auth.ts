import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Credentials({
      // id: "credentials",
      // name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }, 
      },
      authorize: async (credentials: any) => {
        console.log("credentials: ", credentials);
        try {
          const response = await fetch(
            `${process.env.NEXTAUTH_URL}/api/signin`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            },
          );
          const data = await response.json();
          if (response.ok && data.user) {
            return data.user;
          } else {
            throw new Error("ERROR" + data.message);
          }
        } catch (error) {
          throw new Error("ERROR: " + error);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({user, account, profile}) {
      if (account?.provider === "credentials") {
        return true;
      }
      const credentials = {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.email,
        isVerified: true,
      };
      try {
        const response = await fetch(
          `${process.env.NEXTAUTH_URL}/api/signup`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          },
        );
        const data = await response.json();
        if (response.ok && data.status === 200) {
          return true;
        } else {
          throw new Error("ERROR" + data.message);
        }
      } catch (error) {
        throw new Error("ERROR:   " + error);
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
});
