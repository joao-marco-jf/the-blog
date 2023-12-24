import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const {
    handlers: {GET, POST},
    auth,
} = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: {label: "Nome do usuário", type: "text", placeholder: "João Marcos Jensen Francisco"},
                password: {label: "Palavra-passe", type: "password"}
            },
            async authorize(credentials, req){
                const user = {id: "1", name: credentials.username, email: "joaomarcos00512@gmail.com"} as User

                if(user.name == "joao_mjf" && credentials.password == "admin1234"){
                    return user;
                } else {
                    return null;
                }
            }
        }),
        GitHubProvider({
            clientId: "a76cb4ea3cf59ddee252",
            clientSecret: "12440964e56f83cd6c2afaf82fd98af74627f7c4"
        })
    ]
})