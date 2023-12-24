"use client"
import { ChangeEventHandler, FormEventHandler, useState } from "react"
import Textarea from "./textarea"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

import axios from "axios"

async function setArticle(data: {title: string, slug: string, content: string}, id: string){
    const res = await axios("http://localhost:3000/dashboard/api/articles/", {
        method: "POST",
        data: {
            id,
            title: data.title,
            slug: data.slug,
            content: data.content
        }
    })
    const article = await res.data;
    return await article;
}

export default function ArticleForm({articleId, originalTitle, originalSlug, originalContent}: {articleId: string, originalTitle?: string, originalSlug?: string, originalContent?: string}){

    const [ slug, setSlug ] = useState<string>(originalSlug ? originalSlug : String())
    const [ content, setContent ] = useState<string>(originalContent ? originalContent : String())

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        let form = event.target as typeof event.target & {
            title: {value: string},
            slug: {value: string},
            content: {value: string}
        }

        if(slug == "" || content == "" || content == originalContent){
            return;
        }

        let article = {
            title: form.title.value,
            slug: form.slug.value,
            content: content
        }

        await setArticle(article, articleId)
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
                <input onChange={handleChange} className="p-[1rem] w-full outline-none" id="title" type="text" defaultValue={originalTitle ? originalTitle : "Novo artigo"}/>
                <input hidden value={slug} onChange={handleChange} className="p-[1rem] w-full  outline-none" id="slug" type="text"/>
                <button disabled={slug == "" || content == "" || content ==  originalContent} className="p-[1rem] w-[10rem] disabled:bg-blue-200 bg-blue-600 text-white" type="submit">Publicar</button>
            </div>
            <Textarea content={originalContent} setContent={setContent}/>
        </form>
    )
}