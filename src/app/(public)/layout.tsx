export default function PublicLayout({children}: {children: React.ReactNode}){
    return(
        <main id="public" className="select-none">
            {children}
        </main>
    )
}