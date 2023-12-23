import firebase from "..";
import { getFirestore, doc, setDoc, collection, getDocs, getDoc, deleteDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const db = getFirestore(firebase)

export async function setArticle(data: any, id?: string) {
    try {
        await setDoc(doc(db, "articles", id ? id : uuidv4()), data, {
            merge: true
        });
    } catch (error) {
        error = error;
    }
}

export async function getArticle(id: string) {
    let docRef = doc(db, "articles", id);

    let result = null;
    let error = null;

    try {
        const snapshot = await getDoc(docRef);
        result =  snapshot.data()
    } catch (error) {
        error = error;
    }

    return { result, error };
}

export async function getArticles(){
    const collectionRef = collection(db, "articles");
    const snapshot = await getDocs(collectionRef);
    let articles = new Array
    snapshot.forEach(doc => {
        articles.push({id:doc.id , data: doc.data()})
    })
    return articles
}

export async function deleteArticle(id: string){
    let docRef = doc(db, "articles", id);
    let result = null;
    let error = null;

    try {
        result = await deleteDoc(docRef);
    } catch (error) {
        error = error;
    }

    return { result, error };
}