"use server"
import { Timestamp, getFirestore } from "firebase-admin/firestore";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, context: {params: {cookie: string, slug: string}}) {
    const firestore = getFirestore();
    const collectionRef = await firestore.collection("articles").get();
    const articles = await collectionRef.query.where("slug", "==", context.params.slug).get();
    const articleSnapshot = articles.docs[0];

    const costumers = await firestore.collection("costumers").get();
    let index = costumers.docs.findIndex((costumer) => costumer.id === context.params.cookie);
    if(index === -1){
        const costumer = await firestore.collection("costumers").doc(context.params.cookie).set({
            history: [articleSnapshot.id],
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });

        let views = articleSnapshot.data().views;
        articleSnapshot.ref.update({
            views: views + 1
        })
    } else {
        const costumer = await firestore.collection("costumers").doc(context.params.cookie).get();
        const history: Array<string> = costumer.data()?.history;
        let articleIndex = history.findIndex((article) => article === articleSnapshot.id)
        if(articleIndex === -1){
            costumer.ref.update({
                history: [...history, articleSnapshot.id],
                updatedAt: Timestamp.now()
            })

            let views = articleSnapshot.data().views;
            articleSnapshot.ref.update({
                views: views + 1
            })
        }
    }

    const cookieStore = cookies()
    let cookie = cookieStore.get("costumer")
    let data: {id: string, history: Array<string>} = cookie && JSON.parse(cookie.value);
    cookieStore.set({
        name: "costumer",
        value: JSON.stringify({
            id: data.id,
            history: data.history.findIndex((slug) => slug === context.params.slug) != -1 ?
                [...(data.history)] :
                [...(data.history), context.params.slug]
        })
    })

    return NextResponse.redirect(`${request.nextUrl.origin}/article/${context.params.slug}`, 308);
}