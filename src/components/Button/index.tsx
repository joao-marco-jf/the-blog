interface ButtonTypes{
    value: string
}

export default function Button(props: ButtonTypes){
    return(
        <button className="px-[2rem] py-[.8rem] bg-black text-white rounded">{props.value}</button>
    )
}