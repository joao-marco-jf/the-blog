import Link from "next/link";

export default async function AdministrationPage(){
    return(
        <main>
            <Link href={"/administration/articles"}>Artigos</Link>
        </main>
    )
}