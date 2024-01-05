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

        const collectionRef = await firestore.collection("articles").get();
        const articleSnapshot = data.withSlug ?
            (await collectionRef.query.where("slug", "==", data.slug).get()).docs[0] :
            await firestore.collection("articles").doc(data.id).get();
        const article: ArticleModal & {id: string} = {
            id: articleSnapshot.id,
            ...(articleSnapshot.data() as ArticleModal)
        }

        return Response.json(article);

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
