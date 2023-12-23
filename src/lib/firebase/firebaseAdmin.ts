import admin from "firebase-admin";

interface FirebaseAdminAppParams {
  projectId: string
  clientEmail: string
  storageBucket: string
  privateKey: string
}

function formatPrivateKey(key: string){
  return key.replaceAll(/\\n/g, "/n");
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams){
  const privateKey = formatPrivateKey(params.privateKey);

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey
  });

  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket
  })
}

export async function initAdmin(){ 
  const params: FirebaseAdminAppParams = {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET as string,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY as string,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL as string
  }

  return createFirebaseAdminApp(params)
}