import ArticleForm from "@/components/article_form";
import { getArticle } from "@/lib/firebase";
import { initAdmin } from "@/lib/firebase/firebaseAdmin";

interface ArticleTypes {
    id: string
    title: string
    slug: string
    content: string
}

export default async function EditArticlePage({params}: {params: {article_id: string}}){
    await initAdmin();
    const article: ArticleTypes | undefined = await getArticle(params.article_id)

    return(
        <main>
            <ArticleForm articleId={params.article_id} originalTitle={article?.title} originalSlug={article?.slug} originalContent={article?.content}/>
        </main>
    )
}