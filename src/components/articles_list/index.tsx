"use client"

import { deleteArticle } from "@/lib/firebase/database"
import { Edit2Icon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface ArticleTypes{
    id: string
    data: {
        title: string
        slug: string
        content: string
    }
}

export default function ArticlesList(props: {articles: Array<any>}){
    const [articles, setArticles] = useState(props.articles)

    return(
        <>
            {articles.map((article: ArticleTypes, index: number) => (
                <div key={index} className="flex justify-between p-[2rem] bg-zinc-100 w-full">
                    <span>{article.data.title}</span>
                    <div className="flex gap-[1rem]">
                        <Link href={`/administration/articles/${article.id}`}><Edit2Icon color="rgb(180 180 180)"/></Link>
                        <button onClick={async() => {
                            setArticles(state => state.filter((item) => item.id != article.id))
                            await deleteArticle(article.id)
                        }}><Trash2Icon color="rgb(180 180 180)"/></button>
                    </div>
                </div>
            ))}
        </>
    )
}