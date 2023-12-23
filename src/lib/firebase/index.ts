"use server"
import { getFirestore } from "firebase-admin/firestore";



export const setArticle = async (data: any, id: string) => {
    const firestore = getFirestore();
    try{
        const newArticle = await firestore.collection("article").doc(id).set(data);
        return newArticle;
    } catch(error) {
        console.error(error);
    }
}

export const getArticle = async (id: string) => {
    const firestore = getFirestore();
    try{
        const articleSnapshot = await firestore.collection("articles").doc(id).get();
        const article = {
            id: articleSnapshot.id,
            title: articleSnapshot.data()?.title,
            slug: articleSnapshot.data()?.title,
            content: articleSnapshot.data()?.content
        }
        return article;

    } catch (error){
        console.error(error);
    }
}

export const getArticles = async () => {
    const firestore = getFirestore();
    try{
        const articlesSnapshot = await firestore.collection("articles").get();
        const articles = articlesSnapshot.docs.map(article => ({
            id: article.id,
            title: article.data().title,
            slug: article.data().slug,
            content: article.data().content
        }))
        return articles;
    } catch (error){
        console.error(error);
    }
}

export const deleteArticle = async (id: string) => {
    const firestore = getFirestore();
    try{
        const deleteRes = await firestore.collection("articles").doc(id).delete();
        return deleteRes;
    } catch (error){
        console.error(error)
    }
}