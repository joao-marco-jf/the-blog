import { JWT, type DefaultJWT } from "@auth/core/jwt"
import NextAuth, {type DefaultSession, type DefaultUser  } from "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            role: string
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        role: string;
    }
}
