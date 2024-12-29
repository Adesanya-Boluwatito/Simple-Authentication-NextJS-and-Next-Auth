import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/utils/verify";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    // Credentials provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: { email: string; password: string } | undefined) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const { email, password } = credentials;

        // Find user in database
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("No user found with this email.");
        }

        // Verify password
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password.");
        }

        // Return the user object
        return { id: user.id, name: user.name, email: user.email };
      },
    }),

    // Google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    // Facebook provider
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          userId: user.id,
        };
      }
      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken as string,
        userId: token.userId as string,
      };
    },

    async redirect({ url, baseUrl }) {
      // Handle OAuth callbacks
      if (url.includes('/api/auth/callback')) {
        return `${baseUrl}/secrets/success`;
      }
      
      // Handle relative URLs
      if (url.startsWith("/")) {
        return `${baseUrl}${url}`;
      }
      
      // Allow URLs on the same origin
      if (new URL(url).origin === baseUrl) {
        return url;
      }
      
      // Default fallback
      return baseUrl;
    },
  },
  
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },

  // Enable debug messages in development
  debug: process.env.NODE_ENV === 'development',
};