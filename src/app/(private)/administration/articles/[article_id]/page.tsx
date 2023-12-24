import ArticleForm from "@/components/article_form";
import { getArticle } from "@/lib/firebase/database";

interface ArticleTypes {
    title: string
    slug: string
    content: string
}

export default async function EditArticlePage({params}: {params: {article_id: string}}){
    const {result: article, error} = await getArticle(params.article_id)

    return(
        <main>
            <ArticleForm articleId={params.article_id} originalTitle={article?.title} originalSlug={article?.slug} originalContent={article?.content}/>
        </main>
    )
}