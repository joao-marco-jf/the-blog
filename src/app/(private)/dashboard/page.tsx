import Link from "next/link";

export default async function AdministrationPage(){
    return(
        <main className="flex flex-col w-full h-[100vh] justify-center items-center">
            <div className=" leading-[10rem]">
                <h1 className="flex items-end text-[10rem]"><span className="font-light">The</span>Blog</h1>
                <span className="text-[10rem] font-extralight">Studio</span>
            </div>
            <Link href={"/dashboard/articles"}>Artigos</Link>
        </main>
    )
}