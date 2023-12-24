import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import { NextAuthProvider } from "../providers";

export default async function PrivateLayout({children}: {children: React.ReactNode}){
    const session = await auth();

    if(session?.user){
        return(
            <main>
                <NextAuthProvider>
                    {children}
                </NextAuthProvider>
            </main>
        )
    } else {
        redirect("/api/auth/signin");
    }
}