"use client"

import axios from "axios"
import { Edit2Icon, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface ArticleTypes{
    id: string
    title: string
    slug: string
    content: string
}

async function deleteArticle(id: string){
    const res = await axios("http://localhost:3000/dashboard/api/articles/1", {
        method: "DELETE",
        data: {id}
    })
    const article = await res.data;
    return await article;
}

export default function ArticlesList(props: {articles: Array<any> | undefined}){
    const [articles, setArticles] = useState(props.articles)

    return(
        <>
            {articles && articles.map((article: ArticleTypes, index: number) => (
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