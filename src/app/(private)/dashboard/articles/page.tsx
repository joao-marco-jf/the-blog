import ArticlesList from "@/components/articles_list";
import { ArticleModal } from "@/lib/interfaces";
import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

async function getArticles(){
    const res = await axios('/dashboard/api/articles', {
        method: "GET",
        baseURL: "http://localhost:3000",
        headers: {"Content-Type": "application/json"}
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
                <Link href={`/dashboard/articles/${parseInt((Math.random()*(10**10)).toFixed(0)).toString(16)}`}><button className="p-[1rem] w-[10rem] bg-blue-600 text-white" type="submit">Criar artigo</button></Link>
            </div>
            <div className="flex overflow-y-scroll flex-col gap-[1rem] w-full h-full p-[1rem]">
                <ArticlesList articles={articles}/>
            </div>
        </main>
    )
}