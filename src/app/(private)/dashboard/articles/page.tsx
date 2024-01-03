import ArticlesList from "@/components/articles_list";
import { ArticleModal } from "@/lib/interfaces";
import axios from "axios";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

async function getArticles(){
    let articles: (ArticleModal & {id: string})[] | null = null;
    await axios('/api/articles/', {
        method: "GET",
    }).then((res) => {
        articles = res.data
    }).catch((error) => {
        articles = null;
    })
    return articles;
}

export default async function ArticlesPage(){
    const articles: (ArticleModal & {id: string})[] | null = await getArticles() as (ArticleModal & {id: string})[] | null
    
    return(
        <main className="flex flex-col w-full h-full">
            <div className="flex w-full h-fit justify-between bg-white items-center">
                <Link href={"/dashboard/"} className="cursor-pointer h-full flex justify-center items-center px-[1rem]"><ArrowLeftIcon /></Link>
                <Link href={`/dashboard/articles/${parseInt((Math.random()*(10**10)).toFixed(0)).toString(16)}`}><button className="p-[1rem] w-[10rem] bg-blue-600 text-white" type="submit">Criar artigo</button></Link>
            </div>
            <div className="flex overflow-y-scroll flex-col gap-[1rem] w-full h-full p-[1rem]">
                {articles != null && <ArticlesList articles={articles}/>}
            </div>
        </main>
    )
}