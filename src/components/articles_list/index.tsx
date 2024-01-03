"use client"

import { ArticleModal } from "@/lib/interfaces"
import axios from "axios"
import { Edit2Icon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

async function deleteArticle(id: string){
    let article: ArticleModal | null = null;
    await axios("/api/articles/1", {
        headers: {"Content-Type": "application/json"},
        method: "DELETE",
        data: {id}
    }).then((res) => {
        article = res.data
    }).catch((error) => {
        article = null;
    })
    return article;
}

export default function ArticlesList(props: {articles: (ArticleModal & {id: string})[]}){
    const [articles, setArticles] = useState<(ArticleModal & {id: string})[]>(props.articles)

    return(
        <>
            {articles && articles.map((article, index: number) => (
                <div key={index} className="flex justify-between p-[2rem] bg-zinc-100 w-full">
                    <span>{article.title}</span>
                    <div className="flex gap-[1rem]">
                        <Link href={`/dashboard/articles/${article.id}`}><Edit2Icon color="rgb(180 180 180)"/></Link>
                        <button onClick={async() => {
                            setArticles(state => state?.filter((item) => item.id != article.id))

                            await deleteArticle(article.id)
                        }}><Trash2Icon color="rgb(180 180 180)"/></button>
                    </div>
                </div>
            ))}
        </>
    )
}