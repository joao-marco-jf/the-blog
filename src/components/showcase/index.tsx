import Image from "next/image";
import Smooth from "../smooth";
import Link from "next/link"
import { ArticleModal } from "@/lib/interfaces";
import { Timestamp } from "firebase/firestore";

interface ShowcaseProps {
    title: string
    isFirst: boolean
    size: 1 | 2
    articles: ArticleModal[]
}

export default function Showcase(props: ShowcaseProps){
    switch (props.size){
        case 1:
            return(
                <Smooth.section speed="-.25">
                    <Smooth.fragment>
                        <h1 
                            data-scroll
                            data-scroll-speed={!props.isFirst && "-.4"}
                            className={props.isFirst ? "text-[13rem] font-bold uppercase text-black" : "text-[10rem] font-bold uppercase text-black"}
                            data-scroll-css-progress
                            style={props.isFirst ? {opacity: "calc(1 - var(--progress))"}: {opacity: "calc(1 - calc(var(--progress) * 1.4))"}}
                        >{props.title}</h1>
                    </Smooth.fragment>
                    <Smooth.fragment className="z-50 flex w-full gap-[2rem]">
                        <div className="flex w-full max-h-[60vh] aspect-video">
                            <Image className="object-cover rounded-md" src={"/image-001.jpg"} alt="imagem" width={2000} height={1600}/>
                        </div>
                        <div className="flex flex-col w-full py-[2rem] gap-[1rem]">
                            <p>{(new Timestamp(props.articles[0].createdAt.seconds, props.articles[0].createdAt.nanoseconds)).toDate().toDateString()}</p>
                            <h1 className="leading-[3rem] text-[2.8rem] text-zinc-800 tracking-tighter">{props.articles[0].title}</h1>
                            <h2 className="w-[80%] font-light leading-[2.1rem] text-[1.6rem] text-zinc-700 line-clamp-2 tracking-tighter">{props.articles[0].description}</h2>
                            <Link className="w-fit font-light text-[1.6rem] tracking-tighter underline text-zinc-700 hover:underline hover:text-black" href={"#"}>Ler artigo</Link>
                        </div>
                    </Smooth.fragment>
                </Smooth.section>
            )
        case 2:
            return(
                <Smooth.section speed="-.25">
                    <Smooth.fragment>
                        <h1 
                            data-scroll
                            data-scroll-speed={!props.isFirst && "-.4"}
                            className={props.isFirst ? "text-[13rem] font-bold uppercase text-black" : "text-[10rem] font-bold uppercase text-black"}
                            data-scroll-css-progress
                            style={props.isFirst ? {opacity: "calc(1 - var(--progress))"}: {opacity: "calc(1 - calc(var(--progress) * 1.4))"}}
                        >{props.title}</h1>
                    </Smooth.fragment>
                    <Smooth.fragment className="z-50 flex w-full gap-[2rem]">
                        <div
                            data-scroll
                            data-scroll-position="start, start"
                            className="flex flex-col w-full gap-[1rem] rounded-md"
                            data-scroll-css-progress
                            style={{opacity: "calc(var(--progress) + .1)"}}
                        >
                            <div className="flex flex-col w-full gap-[1rem] overflow-hidden">
                            <p>{(new Timestamp(props.articles[0].createdAt.seconds, props.articles[0].createdAt.nanoseconds)).toDate().toDateString()}</p>
                            <h1 className="leading-[3rem] text-[2.8rem] text-zinc-800 tracking-tighter">{props.articles[0].title}</h1>
                            </div>
                            <div className="flex w-full max-h-[60vh] aspect-video">
                            <Image className="object-cover rounded-md" src={"/image-001.jpg"} alt="imagem" width={2000} height={1600}/>
                            </div>
                            <div className="flex flex-col w-full gap-[1rem]">
                            <h2 className="w-[80%] font-light leading-[2.1rem] text-[1.6rem] text-zinc-700 line-clamp-2 tracking-tighter">{props.articles[0].description}</h2>
                            <Link className="w-fit font-light text-[1.6rem] tracking-tighter underline text-zinc-700 hover:underline hover:text-black" href={"#"}>Ler artigo</Link>
                            </div>
                        </div>
                        <div
                            data-scroll
                            data-scroll-position="start, start"
                            className="flex flex-col w-full gap-[1rem] rounded-md"
                            data-scroll-css-progress
                            style={{opacity: "calc(var(--progress) + .1)"}}
                        >
                            <div className="flex flex-col w-full gap-[1rem]">
                            <p>{(new Timestamp(props.articles[1].createdAt.seconds, props.articles[1].createdAt.nanoseconds)).toDate().toDateString()}</p>
                            <h1 className="leading-[3rem] text-[2.8rem] text-zinc-800 tracking-tighter">{props.articles[1].title}</h1>
                            </div>
                            <div className="flex w-full max-h-[60vh] aspect-video">
                            <Image className="object-cover rounded-md" src={"/image-002.jpg"} alt="imagem" width={2000} height={1600}/>
                            </div>
                            <div className="flex flex-col w-full gap-[1rem]">
                            <h2 className="w-[80%] font-light leading-[2.1rem] text-[1.6rem] text-zinc-700 line-clamp-2 tracking-tighter">{props.articles[1].description}</h2>
                            <Link className="w-fit font-light text-[1.6rem] tracking-tighter underline text-zinc-700 hover:underline hover:text-black" href={"#"}>Ler artigo</Link>
                            </div>
                        </div>
                    </Smooth.fragment>
                </Smooth.section>
            )
    }
}