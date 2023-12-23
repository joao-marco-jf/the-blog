"use server"
import { initAdmin } from "@/lib/firebase/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function GET(request: Request) {
    await initAdmin();
    try{
        const firestore = getFirestore();
        const articlesSnapshot = await firestore.collection("articles").get();
        const articles = articlesSnapshot.docs.map(article => ({
            id: article.id,
            title: article.data().title,
            slug: article.data().slug,
            content: article.data().content
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
        const article = await request.json();
        const newArticle = await firestore.collection("articles").doc(article.id).set({
            title: article.title,
            slug: article.slug,
            content: article.content
        });
        return Response.json(newArticle);
    } catch(error) {
        console.error(error);
        return Response.error();
    }
}