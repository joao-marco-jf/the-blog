import ArticleForm from "@/components/article_form";
import { ArticleModal } from "@/lib/interfaces";
import axios from "axios";

async function getArticle(id: string){
    let article: ArticleModal & {id: string} | null = null;
    await axios("/api/articles/1", {
        method: "PUT",
        data: {id, withSlug: false}
    }).then((res) => {
        article = res.data;
    }).catch((error) => {
        article = null;
    })
    return article;
}

export default async function EditArticlePage({params}: {params: {article_id: string}}){
    const article: ArticleModal & {id: string} | null = await getArticle(params.article_id) as ArticleModal & {id: string} | null

    return(
        <main>
            {article != null &&
                <ArticleForm article={{id: params.article_id}} original={{
                    title: article.title == ("" || undefined) ? "Insíra o título do artigo" : article.title,
                    description: article.description == ("" || undefined) ? "" : article.description,
                    slug: article.slug,
                    createdAt: article.createdAt,
                    content: article.content
                }}/>
            }
        </main>
    )
}