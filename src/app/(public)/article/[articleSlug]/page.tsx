import { ArticleModal } from "@/lib/interfaces";
import axios from "axios"

async function getArticle(slug: string){

    let article: ArticleModal | null =  null;
    await axios("/api/articles/1", {
        method: "PUT",
        data: {
            slug: slug,
            withSlug: true
        }
    }).then((res) => {
        article = res.data;
    }).catch((error) => {
        article = null;
    })

    return article
}

export default async function Article({params}: {params: {articleSlug: string}}){
    const article: ArticleModal | null = await getArticle(params.articleSlug) as ArticleModal | null;

    return(
        <main className="p-[5rem] sm:px-[1rem] md:px-[10rem] lg:px-[20rem] xl:px-[22rem] 2xl:px-[28rem]">
            {article != null &&
            <>
                <p><strong>Autor:</strong> {article.author.name}</p>
                <h1>{article.title}</h1>
                <div id="content" dangerouslySetInnerHTML={{__html: article.content}}></div>
            </>
            }
        </main>
    )
}