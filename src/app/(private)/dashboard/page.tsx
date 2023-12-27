import Link from "next/link";

export default async function AdministrationPage(){
    return(
        <main className="grid grid-cols-3 w-full p-[1rem] divide-x-[1px]">
            <div className="flex flex-col justify-center items-center w-full leading-[4.5rem] p-[1rem]">
                <span>
                    <h1 className="flex items-end text-[5rem]"><span className="font-light">The</span>Blog</h1>
                    <span className="text-[5rem] font-extralight">Studio</span>
                </span>
            </div>
            <menu className="flex flex-col text-[1.6rem] gap-[2rem] p-[1rem] uppercase">
                <span className="text-[2rem]">Quick Links</span>
                <div className="flex flex-col gap-[1rem]">
                <Link className="w-fit hover:underline" href={"/"}>The Blog</Link>
                    <Link className="w-fit hover:underline" href={"/dashboard/articles"}>Artigos</Link>
                    <Link className="w-fit hover:underline" href={"#"}>Métricas</Link>
                </div>
            </menu>
            <menu className="flex flex-col text-[1.6rem] gap-[2rem] p-[1rem] uppercase">
                <span className="text-[2rem]">Other Links</span>
                <div className="flex flex-col gap-[1rem]">
                    <Link className="w-fit hover:underline" href={"#"}>Tags</Link>
                    <Link className="w-fit hover:underline" href={"#"}>Coleções</Link>
                    <Link className="w-fit hover:underline" href={"#"}>Produtos</Link>
                    <Link className="w-fit hover:underline" href={"#"}>Seguidores</Link>
                    <Link className="w-fit hover:underline" href={"#"}>Usuários</Link>
                    <Link className="w-fit hover:underline" href={"#"}>Configurações</Link>
                </div>
            </menu>
        </main>
    )
}