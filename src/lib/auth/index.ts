import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import NextAuth, { DefaultSession } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

function formatPrivateKey(key: string){
    return key.replace(/\\n/g, "/n");
}

export const {
    handlers: {GET, POST},
    auth,
} = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        GitHubProvider({
            clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID,
            clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET,
            profile(profile): any{
                return ({
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    role: profile.role ? profile.role : "user"
                })
            }
        })
    ],
    adapter: FirestoreAdapter({
        credential: cert({
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            privateKey: formatPrivateKey(process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY as string),
            clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL
        })
    }) as any,
    callbacks: {
        async jwt({ token, user }){
            return {...token, ...user}
        },
        session({ session, token }){
            session.user.role = token.role as string;
            return session;
        }
    }
})