import { auth } from "@/lib/auth"
import { redirect } from "next/navigation";
import { NextAuthProvider } from "../providers";
import Sidebar from "@/components/sidebar";

export default async function PrivateLayout({children}: {children: React.ReactNode}){
    const session = await auth();

    if(session?.user.role == "admin"){
        return(
            <main className="flex h-[100vh]">
                {/*<Sidebar user={session.user}/>*/}
                <NextAuthProvider>
                    {children}
                </NextAuthProvider>
            </main>
        )
    } else {
        redirect("/api/auth/signin");
    }
}