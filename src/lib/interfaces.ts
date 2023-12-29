import { Timestamp } from "firebase/firestore"

export interface ArticleModal {
    title: string
    slug: string
    content: string
    description: string
    createdAt: Timestamp
    updatedAt: Timestamp
    published: boolean
    author: {
        name: string,
        email: string
    }
}