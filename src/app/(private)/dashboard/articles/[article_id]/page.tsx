import ArticleForm from "@/components/article_form";
import axios from "axios";

async function getArticle(id: string){
    const res = await axios("/dashboard/api/articles/1", {
        method: "PUT",
        data: {id},
        baseURL: "http://localhost:3000",
        headers: {"Content-Type": "application/json"}
    })
    const article = await res.data;
    return await article;
}

export default async function EditArticlePage({params}: {params: {article_id: string}}){
    const article: ArticleModal & {id: string} = await getArticle(params.article_id)

    return(
        <main>
            <ArticleForm article={{id: params.article_id}} original={{
                title: article.title == ("" || undefined) ? "Insíra o título do artigo" : article.title,
                slug: article.slug,
                createdAt: article.createdAt,
                content: article.content
            }}/>
        </main>
    )
}