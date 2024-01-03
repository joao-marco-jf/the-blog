"use server"
import { auth } from "@/lib/auth";
import { initAdmin } from "@/lib/firebase/firebaseAdmin";
import { ArticleModal } from "@/lib/interfaces";
import { getFirestore } from "firebase-admin/firestore";

export async function PUT(request: Request){
    await initAdmin();
    try{
        const firestore = getFirestore();
        const data = await request.json();
        if(data.withSlug){
            const collectionRef = await firestore.collection("articles").get();
            const articleSnapshot = (await collectionRef.query.where("slug", "==", data.slug).get()).docs[0]
            const article: ArticleModal & {id: string} = {
                id: articleSnapshot.id,
                title: articleSnapshot.data()?.title,
                slug: articleSnapshot.data()?.title,
                content: articleSnapshot.data()?.content,
                description: articleSnapshot.data()?.description,
                createdAt: articleSnapshot.data()?.createdAt,
                updatedAt: articleSnapshot.data()?.updatedAt,
                published: articleSnapshot.data()?.published,
                author: articleSnapshot.data()?.author,
                views: articleSnapshot.data()?.views
            }
            return Response.json(article);
        } else {
            const articleSnapshot = await firestore.collection("articles").doc(data.id).get();
            const article: ArticleModal & {id: string} = {
                id: articleSnapshot.id,
                title: articleSnapshot.data()?.title,
                slug: articleSnapshot.data()?.title,
                content: articleSnapshot.data()?.content,
                description: articleSnapshot.data()?.description,
                createdAt: articleSnapshot.data()?.createdAt,
                updatedAt: articleSnapshot.data()?.updatedAt,
                published: articleSnapshot.data()?.published,
                author: articleSnapshot.data()?.author,
                views: articleSnapshot.data()?.views
            }
            return Response.json(article);
        }

    } catch (error){
        console.error(error);
        return Response.error();
    }
}

export async function DELETE(request: Request){
    const session = await auth()
    if(!session || !session.user){
        return Response.error();
    }

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