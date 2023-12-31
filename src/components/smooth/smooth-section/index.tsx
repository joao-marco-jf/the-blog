interface SmoothSectionProps {
    children: React.ReactNode
    speed: string
}

export default function SmoothSection({children, speed}: SmoothSectionProps){
    return(
        <section className="flex items-center min-h-[150.1vh]">
            <div className="flex flex-col" data-scroll data-scroll-speed={speed}>
                {children}
            </div>
        </section>
    )
}