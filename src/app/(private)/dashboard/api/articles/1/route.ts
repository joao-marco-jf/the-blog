"use server"
import { initAdmin } from "@/lib/firebase/firebaseAdmin";
import { getFirestore } from "firebase-admin/firestore";

export async function PUT(request: Request){
    await initAdmin();
    try{
        const firestore = getFirestore();
        const articleBody = await request.json();
        const articleSnapshot = await firestore.collection("articles").doc(articleBody.id).get();
        const article: ArticleModal & {id: string} = {
            id: articleSnapshot.id,
            title: articleSnapshot.data()?.title,
            slug: articleSnapshot.data()?.title,
            content: articleSnapshot.data()?.content,
            createdAt: articleSnapshot.data()?.createdAt,
            updatedAt: articleSnapshot.data()?.updatedAt,
            published: articleSnapshot.data()?.published,
            author: articleSnapshot.data()?.author
        }
        return Response.json(article);

    } catch (error){
        console.error(error);
        return Response.error();
    }
}

export async function DELETE(request: Request){
    await initAdmin();
    try{
        const firestore = getFirestore();
        const articleBody = await request.json();
        const deleteRes = await firestore.collection("articles").doc(articleBody.id).delete();
        return Response.json(deleteRes);
    } catch (error){
        console.error(error)
        return Response.error();
    }
}