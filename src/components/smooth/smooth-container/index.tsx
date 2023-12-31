"use client"

import { useEffect, useState } from 'react'

export default function SmoothContainer({children, className}: {children: React.ReactNode, className?: string}){

    const [scroll, setScroll] = useState<any>(null)

    useEffect(() => {
      if (!scroll) {
        ;(async () => {
          try {
            const LocomotiveScroll = (await import('locomotive-scroll')).default
  
            setScroll(
              new LocomotiveScroll({
                el: document.querySelector('[data-scroll-container]') as HTMLElement ?? undefined,
                smooth: true,
                tablet: {
                  smooth: true,
                  breakpoint: 0,
                },
                smartphone: {
                  smooth: true
                }
              })
            )
          } catch (error) {
            throw Error(`[SmoothScrollProvider]: ${error}`)
          }
        })()
      }
    
      return () => {
        scroll && scroll.destroy()
      }
    }, [scroll])

    return(
        <main className={className} data-scroll-container>
            {children}
        </main>
    )
}