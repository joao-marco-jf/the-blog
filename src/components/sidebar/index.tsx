import { Session } from "next-auth"
import Link from "next/link"

interface SidebarProps {
    user: Session["user"]
}

export default function Sidebar(props: SidebarProps){
    return(
        <main className="flex flex-col gap-[2rem] w-[25%] text-white bg-black m-[1rem] p-[2rem] rounded-md">
            <div className="leading-[2.8rem]">
                <h1><span className="font-normal">The</span>Blog</h1>
                <span className="text-[2.8rem] font-extralight">Studio</span>
            </div>
            <menu className="flex flex-col w-full">
                <li className="flex w-full">
                    <Link className="flex w-full" href={"/dashboard/articles"}>Artigos</Link>
                </li>
            </menu>
        </main>
    )
}