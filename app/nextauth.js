import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (credentials?.username === "admin" && credentials.password === "admin") {
                    return { id: 1, name: "Admin"};
                }
                return null; // Return null if the credentials are invalid
            }
        })
    ],
    pages: {
        signIn: "Login ",
    },
});

export { handler as GET, handler as POST }

