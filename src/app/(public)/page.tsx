import Showcase from "@/components/showcase";
import Smooth from "@/components/smooth";
import { ArticleModal } from "@/lib/interfaces";
import axios from "axios";

async function getArticles(){
  let articles: ArticleModal | null = null;
  await axios("/api/articles", {
    baseURL: "http://localhost:3000",
    headers: {"Content-Type": "application/json"},
    method: "GET",
  }).then((res) => {
    articles = res.data;
  }).catch((error) => {
    articles = null;
  })
  return articles;
}

export default async function HomePage() {
  const articles: ArticleModal[] | null = await getArticles() as ArticleModal[] | null;

  return (
    <>
      {articles != null &&
      <Smooth.container className="flex flex-col gap-[35rem] px-[5rem]">
        <Showcase title="The*Blog" isFirst={true} size={1} articles={articles}/>
        <Showcase title="Relevant*" isFirst={false} size={2} articles={articles}/>
        <Showcase title="New*" isFirst={false} size={2} articles={articles}/>
        <Showcase title="Curiosities*" isFirst={false} size={2} articles={articles}/>
      </Smooth.container>
      }
    </>
  )
}
