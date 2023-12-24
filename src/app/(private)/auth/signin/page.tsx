import SignInForm from "@/components/signin_form";

export default function SignIn(){
    return(
        <main className="flex w-full h-[100vh] justify-center items-center">
            <div className="flex flex-col justify-center items-center gap-[2rem] w-[25rem]">
                <h2 className="font-bold text-zinc-800">The Blog</h2>
                <SignInForm />
            </div>
        </main>
    )
}