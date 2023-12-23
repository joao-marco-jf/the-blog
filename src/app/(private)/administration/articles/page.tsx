import ArticlesList from "@/components/articles_list";
import { getArticles } from "@/lib/firebase";
import { initAdmin } from "@/lib/firebase/firebaseAdmin";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { v4 as uuidv4 } from "uuid";

interface ArticleTypes{
    id: string
    title: string
    slug: string
    content: string
}

export default async function ArticlesPage(){
    await initAdmin();
    const articles: Array<ArticleTypes> | undefined = await getArticles()

    return(
        <main className="flex">
            <div className="fixed flex justify-between w-full bg-white items-center">
                <Link href={"/administration/"} className="cursor-pointer h-full flex justify-center items-center px-[1rem]"><ArrowLeftIcon /></Link>
                <Link href={`/administration/articles/${uuidv4()}`}><button className="p-[1rem] w-[10rem] bg-blue-600 text-white" type="submit">Criar artigo</button></Link>
            </div>
            <div className="flex flex-col gap-[1rem] w-full p-[1rem] mt-[4rem]">
            <ArticlesList articles={articles}/>
            </div>
        </main>
    )
}