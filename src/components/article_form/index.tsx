"use client"
import { ChangeEventHandler, FormEventHandler, useState } from "react"
import Textarea from "./textarea"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

import axios from "axios"
import { useSession } from "next-auth/react"
import { Timestamp } from "firebase/firestore"

interface ArticleFormProps {
    article: {id: string}
    original?: {
        title: string,
        slug: string,
        content: string
        createdAt: number
    }
}

async function setArticle(data: ArticleModal & {id: string}){
    const res = await axios("/dashboard/api/articles/", {
        method: "POST",
        data: data,
        baseURL: "http://localhost:3000",
        headers: {"Content-Type": "application/json"}
    })
    const article = await res.data;
    return await article;
}

export default function ArticleForm(props: ArticleFormProps){

    const [ slug, setSlug ] = useState<string>(props?.original ? props.original.slug : String())
    const [ content, setContent ] = useState<string>(props.original ? props.original.content : String())
    const { data: session } = useSession();
    const isNotChanged = (): boolean => (slug == "" || content == "" || (props.original && content == props.original.content)) as boolean

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        if(isNotChanged()) return;

        let form = event.target as typeof event.target & {
            title: {value: string},
            slug: {value: string},
            content: {value: string}
        }

        let article: ArticleModal = {
            title: form.title.value,
            slug: form.slug.value,
            content: content,
            author: {
                name: session?.user?.name as string,
                email: session?.user?.email as string
            },
            createdAt: props.original?.createdAt || Timestamp.now().toMillis(),
            updatedAt: Timestamp.now().toMillis(),
            published: true
        }

        await setArticle({...article, id: props.article.id})
    }

    const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        event.preventDefault()
        let input = event.target as typeof event.target & {value: string}
        setSlug(input.value.replaceAll(/[^a-zA-Z0-9\s]/g, "").replaceAll(/\s/g, "-").toLowerCase())
    }
    
    return(
        <form className="flex flex-col h-[100vh]" onSubmit={handleSubmit}>
            <div className="fixed flex h-[4rem] z-50 w-full justify-between border-b-[1px] border-white">
                <Link href={"/dashboard/articles"} className="cursor-pointer h-full flex justify-center items-center px-[1rem]"><ArrowLeftIcon /></Link>
                <input onChange={handleChange} className="p-[1rem] w-full outline-none" id="title" type="text" defaultValue={props.original ? props.original.title : "Novo artigo"}/>
                <input hidden value={slug} onChange={handleChange} className="p-[1rem] w-full  outline-none" id="slug" type="text"/>
                <button disabled={isNotChanged()} className="p-[1rem] w-[10rem] disabled:bg-blue-200 bg-blue-600 text-white" type="submit">Publicar</button>
            </div>
            <Textarea content={props.original && props.original.content} setContent={setContent}/>
        </form>
    )
}