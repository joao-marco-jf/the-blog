"use client"

import axios from "axios"
import { useRouter } from "next/navigation";
import { FormEventHandler } from "react"

async function createUser(data: {name: string, email: string, password: string}){
    const res = await axios("http://localhost:3000/dashboard/api/auth/signin", {
        method: "POST",
        data
    })
    const user = await res.data;
    return await user;
}

export default function SignInForm(){
    const route = useRouter();

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault()
        let form = event.target as typeof event.target & {
            name: {value: string},
            email: {value: string},
            password: {value: string},
        }

        let user = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value
        }

        createUser(user).then((res) => {
            route.push("/dashboard");
        })
    }

    return(
        <form onSubmit={handleSubmit} className="flex flex-col gap-[1rem] w-full">
            <input required id="name" className="p-[.8rem] border-[1px] border-zinc-200" type="text" placeholder="João Marcos Jensen"/>
            <input required id="email" className="p-[.8rem] border-[1px] border-zinc-200" type="email" placeholder="exemplo@exemplo.com"/>
            <input required id="password" className="p-[.8rem] border-[1px] border-zinc-200" type="password" placeholder="**********" />
            <input className="transition-all duration-500 p-[.8rem] border-[1px] border-zinc-200 hover:bg-black hover:text-white" type="submit" value={"Criar conta"}/>
        </form>
    )
}