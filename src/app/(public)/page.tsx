import Showcase from "@/components/showcase";
import Smooth from "@/components/smooth";
import { ArticleModal } from "@/lib/interfaces";
import axios from "axios";

async function getArticles(by?: string, order?: string){
  let articles: ArticleModal[] | null = null;
  await axios(`/api/articles/${by}/${order}`, {
    method: "GET",
  }).then((res) => {
    articles = res.data;
  }).catch((error) => {
    articles = null;
  })
  return articles;
}

export default async function HomePage() {
  const articles: ArticleModal[] | null = await getArticles("created-at", "desc") as ArticleModal[] | null;
  const relevants: ArticleModal[] | null = await getArticles("views", "desc") as ArticleModal[] | null;
  const old: ArticleModal[] | null = await getArticles("created-at", "asc") as ArticleModal[] | null;

  return (
    <>
      {articles && relevants && old &&
      <Smooth.container className="flex flex-col gap-[35rem] px-[5rem]">
        <Showcase title="The*Blog" isFirst={true} size={1} articles={relevants}/>
        <Showcase title="Relevant*" isFirst={false} size={2} articles={relevants.slice(1)}/>
        <Showcase title="New*" isFirst={false} size={2} articles={articles}/>
        <Showcase title="Curiosities*" isFirst={false} size={2} articles={old}/>
      </Smooth.container>
      }
    </>
  )
}
