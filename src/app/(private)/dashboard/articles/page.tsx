import ArticlesList from "@/components/articles_list";
import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

import { v4 as uuidv4 } from "uuid";

async function getArticles(){
    const res = await axios("http://localhost:3000/dashboard/api/articles/", {
        method: "GET"
    })
    const articles = await res.data
    return await articles
}

export default async function ArticlesPage(){
    const articles: (ArticleModal & {id: string})[] = await getArticles()

    return(
        <main className="flex flex-col w-full h-full">
            <div className="flex w-full h-fit justify-between bg-white items-center">
                <Link href={"/dashboard/"} className="cursor-pointer h-full flex justify-center items-center px-[1rem]"><ArrowLeftIcon /></Link>
                <Link href={`/dashboard/articles/${uuidv4()}`}><button className="p-[1rem] w-[10rem] bg-blue-600 text-white" type="submit">Criar artigo</button></Link>
            </div>
            <div className="flex overflow-y-scroll flex-col gap-[1rem] w-full h-full p-[1rem]">
                <ArticlesList articles={articles}/>
            </div>
        </main>
    )
}