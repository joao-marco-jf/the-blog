import ArticleForm from "@/components/article_form";
import axios from "axios";

interface ArticleTypes {
    id: string
    title: string
    slug: string
    content: string
}

async function getArticle(id: string){
    const res = await axios("http://localhost:3000/dashboard/api/articles/1", {
        method: "PUT",
        data: {id}
    })
    const article = await res.data;
    return await article;
}

export default async function EditArticlePage({params}: {params: {article_id: string}}){
    const article: ArticleTypes | undefined = await getArticle(params.article_id)

    return(
        <main>
            <ArticleForm articleId={params.article_id} originalTitle={article?.title} originalSlug={article?.slug} originalContent={article?.content}/>
        </main>
    )
}