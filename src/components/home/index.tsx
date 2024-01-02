import Showcase from "@/components/showcase";
import Smooth from "@/components/smooth";
import { ArticleModal } from "@/lib/interfaces";
import axios from "axios";

async function getArticles(){
  const res = await axios("/api/articles", {
    baseURL: "http://localhost:3000",
    headers: {"Content-Type": "application/json"},
    method: "GET",
  })
  const articles = await res.data;
  return articles;
}

export default async function HomeContent(){
    const articles: ArticleModal[] = await getArticles();

    return(
        <Smooth.container className="flex flex-col gap-[35rem] px-[5rem]">
            <Showcase title="The*Blog" isFirst={true} size={1} articles={articles}/>
            <Showcase title="Relevant*" isFirst={false} size={2} articles={articles}/>
            <Showcase title="New*" isFirst={false} size={2} articles={articles}/>
            <Showcase title="Curiosities*" isFirst={false} size={2} articles={articles}/>
        </Smooth.container>
    )
}