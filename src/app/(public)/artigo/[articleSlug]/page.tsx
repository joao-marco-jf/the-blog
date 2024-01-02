import { ArticleModal } from "@/lib/interfaces";
import axios from "axios"

async function getArticle(slug: string){
    const res = await axios("/api/articles/1", {
        baseURL: "http://localhost:3000",
        method: "PUT",
        data: {
            slug: slug
        }
    })
    const article = res.data;
    return article as ArticleModal
}

export default async function Article({params}: {params: {articleSlug: string}}){
    const article: ArticleModal = await getArticle(params.articleSlug);
    
    return(
        <main className="p-[5rem] sm:px-[1rem] md:px-[10rem] lg:px-[20rem] xl:px-[22rem] 2xl:px-[28rem]">
            <p><strong>Autor:</strong> {article.author.name}</p>
            <h1>{article.title}</h1>
            <div id="content" dangerouslySetInnerHTML={{__html: article.content}}></div>
        </main>
    )
}