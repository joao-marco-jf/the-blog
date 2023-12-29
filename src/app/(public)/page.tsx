import ArticlesGrid from "@/components/articles_grid";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

async function getArticles(){
  const res = await axios("/api/articles", {
    baseURL: "http://localhost:3000",
    headers: {"Content-Type": "application/json"},
    method: "GET",
  })
  const articles = await res.data;
  return articles;
}

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <main className="flex flex-col w-full p-[2rem] gap-[5rem]">
      <ArticlesGrid columns={1} title="The Blog" articles={articles}/>
      <ArticlesGrid columns={2} title="Artigos relevantes" articles={articles}/>
      <ArticlesGrid columns={3} title="Artigos recentes" articles={articles} />
    </main>
  )
}
