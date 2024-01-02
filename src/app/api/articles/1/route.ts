"use server"
import { initAdmin } from "@/lib/firebase/firebaseAdmin";
import { ArticleModal } from "@/lib/interfaces";
import { getFirestore } from "firebase-admin/firestore";

export async function PUT(request: Request){
    await initAdmin();
    try{
        const firestore = getFirestore();
        const articleBody = await request.json();
        const collectionRef = await firestore.collection("articles").get();
        const articleSnapshot = (await collectionRef.query.where("slug", "==", articleBody.slug).get()).docs[0];
        const article: ArticleModal & {id: string} = {
            id: articleSnapshot.id,
            title: articleSnapshot.data()?.title,
            slug: articleSnapshot.data()?.title,
            content: articleSnapshot.data()?.content,
            description: articleSnapshot.data()?.description,
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