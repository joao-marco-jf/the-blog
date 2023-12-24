"use server"
import { initAdmin } from "@/lib/firebase/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function GET(request: Request) {
    await initAdmin();
    try{
        const firestore = getFirestore();
        const articlesSnapshot = await firestore.collection("articles").get();
        const articles: (ArticleModal & {id: string})[] = articlesSnapshot.docs.map((article) => ({
            id: article.id,
            title: article.data().title,
            slug: article.data().slug,
            content: article.data().content,
            createdAt: article.data().createdAt,
            updatedAt: article.data().updatedAt,
            published: article.data().published,
            author: article.data().author
        }))
        return Response.json(articles);
    } catch (error){
        console.error(error);
        return Response.error();
    }
}

export async function POST(request: Request) {
    await initAdmin();
    try{
        const firestore = getFirestore();
        const data = await request.json();
        const article: ArticleModal = {
            title: data.title,
            slug: data.slug,
            content: data.content,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            published: data.published,
            author: data.author
        }
        const newArticle = await firestore.collection("articles").doc(data.id).set(article);
        return Response.json(newArticle);
    } catch(error) {
        console.error(error);
        return Response.error();
    }
}