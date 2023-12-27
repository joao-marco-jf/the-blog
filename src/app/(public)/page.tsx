import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full min-h-[100vh] p-[2rem] pt-[10rem] gap-[2rem]">
      <div className="w-full h-[60vh] bg-zinc-200 rounded-md"></div>
      <h1 className="w-full text-justify uppercase text-[10rem] text-zinc-200">Mais relevantes</h1>
      <div className="grid grid-cols-2 gap-[2rem]">
        <div className="w-full aspect-video bg-zinc-200 rounded-md"></div>
        <div className="w-full aspect-video bg-zinc-200 rounded-md"></div>
      </div>
      <h1 className="w-full text-justify uppercase text-[10rem] text-zinc-200">Últimos artigos</h1>
      <div className="grid grid-cols-3 gap-[2rem]">
        <div className="w-full aspect-square bg-zinc-200 rounded-md"></div>
        <div className="w-full aspect-square bg-zinc-200 rounded-md"></div>
        <div className="w-full aspect-square bg-zinc-200 rounded-md"></div>
        <div className="w-full aspect-square bg-zinc-200 rounded-md"></div>
        <div className="w-full aspect-square bg-zinc-200 rounded-md"></div>
        <div className="w-full aspect-square bg-zinc-200 rounded-md"></div>
      </div>
    </main>
  )
}
