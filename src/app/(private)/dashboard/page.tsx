import Link from "next/link";

export default async function AdministrationPage(){
    return(
        <main>
            <Link href={"/dashboard/articles"}>Artigos</Link>
        </main>
    )
}