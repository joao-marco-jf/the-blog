interface ArticleModal {
    title: string
    slug: string
    content: string
    createdAt: number
    updatedAt: number
    published: boolean
    author: {
        name: string,
        email: string
    }
}