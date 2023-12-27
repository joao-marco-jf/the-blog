"use client"
import LocomotiveScroll from "locomotive-scroll";
import { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {

  useEffect(() => {
    let scroll: LocomotiveScroll;
    import ("locomotive-scroll").then((locomotiveModule) => {
      scroll = new locomotiveModule.default({
        el: document.querySelector("[data-scroll-container]") as HTMLElement,
        smooth: true,
        resetNativeScroll: true,
        lerp: 0.05,
        multiplier: 0.2
      })
    })

    return () => {
      if (scroll) scroll.destroy();
    }
  }, [])

  return (
    <main data-scroll-container className="flex flex-col w-full p-[2rem] gap-[5rem]">
      <div data-scroll>
        <h1 data-scroll data-scroll-speed="1" data-scroll-position="top" className="p-[5rem] uppercase text-[8rem] text-zinc-800">The*Blooog</h1>
        <div data-scroll data-scroll-speed="10" data-scroll-position="top" className="flex w-full items-center p-[5rem]">
          <div className="flex w-[50%] max-h-[60vh] aspect-video">
            <Image className="object-cover rounded-md" src={"/image-001.jpg"} alt="imagem" width={2000} height={1600}/>
          </div>
          <div className="flex flex-col w-[50%] px-[2rem] gap-[2rem]">
            <p>27 de Dezembro</p>
            <h1 className="leading-[4rem] text-[3.5rem] text-zinc-800 tracking-tighter w-[80%]">Faculdade para programador</h1>
            <h2 className="font-light leading-[2.3rem] text-[1.8rem] text-zinc-700 w-[80%] line-clamp-2 tracking-tighter">Cursar uma faculdade para se tornar um programador ainda vale a pena? Certamente você já se fez esta pergunta, assim como eu mesmo já me fiz a algum tempo atrás</h2>
            <Link className="w-fit font-light text-[1.8rem] tracking-tighter underline text-zinc-700 hover:underline hover:text-black" href={"#"}>Ler artigo</Link>
          </div>
        </div>
      </div>
      <div data-scroll>
        <h1 data-scroll data-scroll-speed="1" data-scroll-position="top" className="p-[5rem] uppercase text-[8rem] text-zinc-800">Artigos*relevantes</h1>
        
        <div data-scroll data-scroll-speed="10" data-scroll-position="top" className="grid grid-cols-2 gap-[5rem] p-[5rem]">
          
          <div className="flex flex-col w-full aspect-square rounded-md">
            <div className="flex flex-col w-full py-[2rem] gap-[1rem]">
                <p>27 de Dezembro</p>
                <h1 className="leading-[3rem] text-[2.8rem] text-zinc-800 tracking-tighter">Faculdade para programador</h1>
            </div>
            <div className="flex w-full max-h-[60vh] aspect-video">
              <Image className="object-cover rounded-md" src={"/image-001.jpg"} alt="imagem" width={2000} height={1600}/>
            </div>
            <div className="flex flex-col w-full py-[2rem] gap-[1rem]">
              <h2 className="w-[80%] font-light leading-[2.1rem] text-[1.6rem] text-zinc-700 line-clamp-2 tracking-tighter">Cursar uma faculdade para se tornar um programador ainda vale a pena? Certamente você já se fez esta pergunta, assim como eu mesmo já me fiz a algum tempo atrás</h2>
              <Link className="w-fit font-light text-[1.6rem] tracking-tighter underline text-zinc-700 hover:underline hover:text-black" href={"#"}>Ler artigo</Link>
            </div>
          </div>
          
          <div className="flex flex-col w-full aspect-square rounded-md">
            <div className="flex flex-col w-full py-[2rem] gap-[1rem]">
                <p>27 de Dezembro</p>
                <h1 className="leading-[3rem] text-[2.8rem] text-zinc-800 tracking-tighter">Primeiros passos com Python</h1>
            </div>
            <div className="flex w-full max-h-[60vh] aspect-video">
              <Image className="object-cover rounded-md" src={"/image-002.jpg"} alt="imagem" width={2000} height={1600}/>
            </div>
            <div className="flex flex-col w-full py-[2rem] gap-[1rem]">
              <h2 className="w-[80%] font-light leading-[2.1rem] text-[1.6rem] text-zinc-700 line-clamp-2 tracking-tighter">Você quer aprender a programar? Entrar nessa área pode ser algo assustador inicialmente, fazendo você achar que precisa de aulas para aprender. Isso é verdade para algumas linguagens, mas é possível aprender o básico de várias outras em apenas um ou dois dias. O Python[1] é uma delas. Você conseguirá deixar um programa básico em Python funcionando em apenas alguns minutos.</h2>
              <Link className="w-fit font-light text-[1.6rem] tracking-tighter underline text-zinc-700 hover:underline hover:text-black" href={"#"}>Ler artigo</Link>
            </div>
          
          </div>
        </div>

      </div>
      <div data-scroll data-scroll-speed="4">
        <h1 data-scroll className="p-[5rem] uppercase text-[8rem] text-zinc-800">Artigos*recentes</h1>
        
        <div data-scroll className="grid grid-cols-3 gap-[2rem] p-[5rem]">

          <div className="flex flex-col w-full rounded-md border">
            <div className="flex w-full max-h-[60vh] aspect-video">
              <Image className="object-cover rounded-md" src={"/image-001.jpg"} alt="imagem" width={2000} height={1600}/>
            </div>
            <div className="flex flex-col w-full p-[1rem] gap-[1rem]">
              <p>27 de Dezembro</p>
              <h1 className="leading-[1.6rem] text-[1.8rem] text-zinc-800 tracking-tighter">Faculdade para programador</h1>
              <h2 className="w-[80%] font-light leading-[1.4rem] text-[1.2rem] text-zinc-700 line-clamp-2 tracking-tighter">Cursar uma faculdade para se tornar um programador ainda vale a pena? Certamente você já se fez esta pergunta, assim como eu mesmo já me fiz a algum tempo atrás</h2>
              <Link className="w-fit font-light text-[1.2rem] tracking-tighter underline text-zinc-700 hover:underline hover:text-black" href={"#"}>Ler artigo</Link>
            </div>
          </div>

          <div className="flex flex-col w-full rounded-md border">
            <div className="flex w-full max-h-[60vh] aspect-video">
              <Image className="object-cover rounded-md" src={"/image-002.jpg"} alt="imagem" width={2000} height={1600}/>
            </div>
            <div className="flex flex-col w-full p-[1rem] gap-[1rem]">
              <p>27 de Dezembro</p>
              <h1 className="leading-[1.6rem] text-[1.8rem] text-zinc-800 tracking-tighter">Primeiros passos com Python</h1>
              <h2 className="w-[80%] font-light leading-[1.4rem] text-[1.2rem] text-zinc-700 line-clamp-2 tracking-tighter">Você quer aprender a programar? Entrar nessa área pode ser algo assustador inicialmente, fazendo você achar que precisa de aulas para aprender. Isso é verdade para algumas linguagens, mas é possível aprender o básico de várias outras em apenas um ou dois dias. O Python[1] é uma delas. Você conseguirá deixar um programa básico em Python funcionando em apenas alguns minutos.</h2>
              <Link className="w-fit font-light text-[1.2rem] tracking-tighter underline text-zinc-700 hover:underline hover:text-black" href={"#"}>Ler artigo</Link>
            </div>
          </div>

        </div>

      </div>
      <div data-scroll data-scroll-speed="8" className="flex w-full p-[2rem]">
          <div className="flex w-full h-[20rem] p-[2rem] bg-zinc-800 text-white uppercase rounded-md">
              <Link className="hover:underline" href={"/dashboard"}>Dashboard</Link>
          </div>
      </div>
    </main>
  )
}
