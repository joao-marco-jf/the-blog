export default function SmoothFragment({children, className}: {children: React.ReactNode, className?: string}){
    return(
        <div className={className} data-scroll>{children}</div>
    )
}