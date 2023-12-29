import { ArticleModal } from "@/lib/interfaces";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

interface ArticlesGridProps {
  title: string
  columns: number
  articles: ArticleModal[]
}

function Grid({children, columns}: {children: React.ReactNode, columns: number}){
  switch(columns){
    case 1:
      return(
        <div className="grid grid-cols-1 gap-[5rem] p-[5rem]">
          <div className="flex w-full gap-[2rem] rounded-md">
          {children}
          </div>
        </div>
      )
    case 2:
      return(
        <div className="grid grid-cols-2 gap-[5rem] p-[5rem]">
          {children}
        </div>
      )
    case 3:
      return(
        <div className="grid grid-cols-3 gap-[2rem] p-[5rem]">
          {children}
        </div>
      )
  }
  
}

export default function ArticlesGrid(props: ArticlesGridProps){
    return(
        <div className="flex flex-col w-full">
          <h1 className="w-full p-[5rem] uppercase text-[8rem] text-zinc-800">{props.title.replaceAll(/\s/g, "*")}</h1>
          {props.columns == 1 
          ?
          <Grid columns={props.columns}>
              <div className="flex w-full max-h-[60vh] aspect-video">
                <Image className="object-cover rounded-md" src={"/image-001.jpg"} alt="imagem" width={2000} height={1600}/>
              </div>
              <div className="flex flex-col w-full py-[2rem] gap-[1rem]">
                <p>{new Timestamp(props.articles[0].createdAt.seconds, props.articles[0].createdAt.nanoseconds).toDate().toDateString()}</p>
                <h1 className="leading-[3rem] text-[2.8rem] text-zinc-800 tracking-tighter">{props.articles[0].title}</h1>
                <h2 className="w-[80%] font-light leading-[2.1rem] text-[1.6rem] text-zinc-700 line-clamp-2 tracking-tighter">{props.articles[0].description}</h2>
                <Link className="w-fit font-light text-[1.6rem] tracking-tighter underline text-zinc-700 hover:underline hover:text-black" href={"#"}>Ler artigo</Link>
              </div>
          </Grid>
          :
          <Grid columns={props.columns}>
            {props.articles.slice(0, props.columns).map((article: ArticleModal, index: number) => (
                <div key={index} className="flex flex-col w-full aspect-square rounded-md">
                  <div className="flex flex-col w-full py-[2rem] gap-[1rem]">
                    <p>{new Timestamp(article.createdAt.seconds, article.createdAt.nanoseconds).toDate().toDateString()}</p>
                  </div>
                  <div className="flex w-full max-h-[60vh] aspect-video">
                    <Image className="object-cover rounded-md" src={"/image-001.jpg"} alt="imagem" width={2000} height={1600}/>
                  </div>
                  <div className="flex flex-col w-full py-[2rem] gap-[1rem]">
                    <h1 className="leading-[3rem] text-[2.8rem] text-zinc-800 tracking-tighter">{article.title}</h1>
                    <h2 className="w-[80%] font-light leading-[2.1rem] text-[1.6rem] text-zinc-700 line-clamp-2 tracking-tighter">{article.description}</h2>
                    <Link className="w-fit font-light text-[1.6rem] tracking-tighter underline text-zinc-700 hover:underline hover:text-black" href={"#"}>Ler artigo</Link>
                  </div>
                </div>
            ))}
          </Grid>
          }
          
      </div>
    )
}