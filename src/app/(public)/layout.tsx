import Link from "next/link";

export default function PublicLayout({children}: {children: React.ReactNode}){
    return(
        <main className="select-none">
            <div className="fixed flex w-full px-[2rem] pt-[2rem] bg-white">
                <div className="flex w-full h-[6rem] bg-zinc-800 rounded-md"></div>
            </div>
            {children}
            <div className="flex w-full p-[2rem]">
                <div className="flex w-full h-[20rem] p-[2rem] bg-zinc-800 text-white uppercase rounded-md">
                    <Link className="hover:underline" href={"/dashboard"}>Dashboard</Link>
                </div>
            </div>
        </main>
    )
}