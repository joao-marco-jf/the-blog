import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest){
    const res = NextResponse.next()
    
    let slug = request.url.replace(`${request.nextUrl.origin}/`, "").replaceAll("article/", "")

    let userCookie = request.cookies.get("costumer");
    if(userCookie) {
        let data: {id: string, history: Array<string>} = JSON.parse(userCookie.value);
        if(data.history.findIndex((page) => page === slug) != -1) return res;
        return NextResponse.redirect(`${request.nextUrl.origin}/api/checkpoint/${data.id}/${slug}`)
    }
    else {
        res.cookies.set({
            name: "costumer",
            value: JSON.stringify({id: (Date.now()).toString(16), history: []})
        })

        let newUserCookie = request.cookies.get("costumer");
        if(newUserCookie){
            let newData: {id: string, history: Array<string>} = JSON.parse(newUserCookie.value);
            if(newData.history.findIndex((page) => page === slug) != -1) return res;
            return NextResponse.redirect(`${request.nextUrl.origin}/api/checkpoint/${newData.id}/${slug}`);
        }
        return res
    }
}

export const config = {
    matcher: "/article/:path*"
}