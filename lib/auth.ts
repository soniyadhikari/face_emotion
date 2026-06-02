import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

const isGoogleConfigured =
  !!process.env.GOOGLE_CLIENT_ID &&
  !!process.env.GOOGLE_CLIENT_SECRET &&
  process.env.GOOGLE_CLIENT_ID !== "google-client-id" &&
  process.env.GOOGLE_CLIENT_SECRET !== "google-client-secret"

const providers = [
  CredentialsProvider({
    name: "Email",
    credentials: {
      email: { label: "Email", type: "email", placeholder: "you@company.com" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) {
        return null
      }

      const user = await prisma.user.findUnique({
        where: { email: credentials.email },
      })

      if (!user || !user.password) {
        return null
      }

      const isValidPassword = await bcrypt.compare(credentials.password, user.password)
      if (!isValidPassword) {
        return null
      }

      return {
        id: user.id,
        name: user.name ?? undefined,
        email: user.email,
        image: user.image ?? undefined,
      }
    },
  }),
  ...(isGoogleConfigured
    ? [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
      ]
    : []),
]

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
}