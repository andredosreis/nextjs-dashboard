import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.email === "admin" && credentials.password === "admin") {
          return { id: "1", name: "Admin" };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
