"use server"
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
            author: article.data().author
        }))
        return Response.json(articles);
    } catch (error){
        console.error(error);
        return Response.error();
    }
}