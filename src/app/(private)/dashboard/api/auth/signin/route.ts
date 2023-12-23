import { initAdmin } from "@/lib/firebase/firebaseAdmin";
import { CreateRequest, UserRecord, getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

export async function POST(request: Request){
    await initAdmin();
    try{
        const data = await request.json();

        const auth = getAuth();
        const firestore = getFirestore();

        const properties: CreateRequest = {
            displayName: data.name,
            email: data.email,
            password: data.password
        }

        const user: UserRecord = await auth.createUser(properties)

        if(user && user.email){
            firestore.collection("users").doc(user.email).set({
                name: properties.displayName,
                role: "user"
            })
        }
        return Response.json({user})
    } catch (error){
        console.error(error);
        return Response.error();
    }
}