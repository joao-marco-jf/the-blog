
import Link from "next/link";

export default function PublicLayout({children}: {children: React.ReactNode}){
    return(
        <main className="select-none">
            {children}
        </main>
    )
}