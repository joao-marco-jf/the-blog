import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full h-[100vh] justify-center items-center">
      <h1 className="flex text-[10rem]"><span className="font-light">The</span>Blog</h1>
      <Link href={"/administration"}>Administração</Link>
    </main>
  )
}
