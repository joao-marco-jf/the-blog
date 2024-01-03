"use server"
import { auth } from "@/lib/auth";
import { initAdmin } from "@/lib/firebase/firebaseAdmin";
import { ArticleModal } from "@/lib/interfaces";
import { getFirestore } from "firebase-admin/firestore";

export async function GET(request: Request) {
    await initAdmin();
    try{
        const firestore = getFirestore();
        const articlesSnapshot = await firestore.collection("articles").orderBy("createdAt.seconds", "desc").get();
        const articles: (ArticleModal & {id: string})[] = articlesSnapshot.docs.map((article) => ({
            id: article.id,
            title: article.data().title,
            slug: article.data().slug,
            content: article.data().content,
            description: article.data().description,
            createdAt: article.data().createdAt,
            updatedAt: article.data().updatedAt,
            published: article.data().published,
            author: article.data().author,
            views: article.data().views
        }))
        return Response.json(articles);
    } catch (error){
        console.error(error);
        return Response.error();
    }
}

export async function POST(request: Request) {
    const session = await auth()
    if(!session || !session.user){
        return Response.error();
    }

    const data = await request.json();

    await initAdmin();
    try{
        const firestore = getFirestore()
        const article: ArticleModal = {...data}
        const newArticle = await firestore.collection("articles").doc(data.id).set(article);
        return Response.json(newArticle);
    } catch(error) {
        const data = await request.json();
        console.error(error);
        return Response.error();
    }
}