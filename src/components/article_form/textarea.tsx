"use client"

import Document from '@tiptap/extension-document'
import Dropcursor from '@tiptap/extension-dropcursor'
import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Paragraph from '@tiptap/extension-paragraph'
import Placeholder from '@tiptap/extension-placeholder'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'
import { useEditor, EditorContent, JSONContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Heading from "@tiptap/extension-heading"
import { 
    AlignCenterIcon,
    AlignJustifyIcon,
    AlignLeftIcon,
    AlignRightIcon,
    BoldIcon,
    CodeIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    ImageIcon,
    ItalicIcon,
    Redo2Icon,
    RemoveFormattingIcon,
    Undo2Icon
} from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface TextareaTypes {
    title?: string
    content?: string
    setContent: Dispatch<SetStateAction<string>>,
    setTitle: Dispatch<SetStateAction<string>>,
    setDescription: Dispatch<SetStateAction<string>>,
}

const CustomDocument = Document.extend({
    content: `title subtitle block+`
})

const Title = Heading.extend({
    name: "title",
    group: "title",
    parseHTML: () => [{tag: "h1:first-child"}]
}).configure({levels: [1]})

const Subtitle = Heading.extend({
    name: "subtitle",
    group: "subtitle",
    parseHTML: () => [{tag: "h2:first-child"}]
}).configure({levels: [2]})

export default function Textarea(props: TextareaTypes){
    const editor = useEditor({
        extensions: [
            CustomDocument,
            Title,
            Subtitle,
            StarterKit.configure({
                document: false
            }),
            Highlight,
            Typography,
            Image,
            Text,
            Dropcursor,
            Paragraph,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: ({node}) => {
                    if(node.type.name === "title"){
                        return "Informe o título do artigo"
                    } else if(node.type.name === "subtitle"){
                        return "Informe o subtítulo do artigo"
                    }
                    return "Insíra o conteúdo do artigo"
                }
            })
        ],
        content: (props.title && props.content) && `<h1/>${props.title}</h1>` + props.content,
        editorProps: {
            attributes: {
              class: "focus:outline-none min-h-[80vh] py-[5rem] sm:px-[1rem] lg:px-[20rem] 2xl:px-[30rem]"
            },
        },
        onUpdate: (anchors) => {
            if(anchors.editor.getText() == String()){
                props.setContent(String())
            } else {
                let json = anchors.editor.getJSON()
                let html = anchors.editor.getHTML()
                let withoutTitle = html.indexOf("</h1>") + "</h1>".length
                if(json.content){
                    let firstParagraph = json.content.find(item => item.type == "paragraph")
                    if(firstParagraph && firstParagraph.content && firstParagraph.content.length > 0){ 
                        props.setDescription(firstParagraph.content[0].text || String())
                    }
                }
                props.setContent(html.slice(withoutTitle, html.length))
            }

            const title: JSONContent = anchors.editor.getJSON().content?.find(item => item.type == "title") as JSONContent
            if(!title.content) {
                props.setTitle(String());
                return
            }
            const titleValue = title?.content[0].text as string
            props.setTitle(titleValue)
        }
    })

    return(
        <div className='w-full h-[100%] mt-[4rem] mb-[4rem]'>
            {!editor && <div className='flex w-[100vw] h-full justify-center items-center'><span>Carregando...</span></div>}
            {editor &&
            <>
                <div className='fixed z-50 flex items-center w-full bg-black gap-[1rem] h-[4rem]'>
                    <div
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><BoldIcon className={editor.isActive("bold") ? "text-white" : "text-zinc-400"}/></div>
                    <div
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><ItalicIcon className={editor.isActive("italic") ? "text-white" : "text-zinc-400"}/></div>
                    <div
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><CodeIcon className={editor.isActive("code") ? "text-white" : "text-zinc-400"}/></div>
                    <div className='w-[2rem]'></div>
                    <div
                        onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><Heading1Icon className={editor.isActive("heading", {level: 1}) ? "text-white" : "text-zinc-400"}/></div>
                    <div
                        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><Heading2Icon className={editor.isActive("heading", {level: 2}) ? "text-white" : "text-zinc-400"}/></div>
                    <div
                        onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><Heading3Icon className={editor.isActive("heading", {level: 3}) ? "text-white" : "text-zinc-400"}/></div>
                    <div className='w-[2rem]'></div>
                    <div
                        onClick={() => editor.chain().focus().setTextAlign("left").run()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><AlignLeftIcon className={editor.isActive({textAlign: "left"}) ? "text-white" : "text-zinc-400"}/></div>
                    <div
                        onClick={() => editor.chain().focus().setTextAlign("center").run()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><AlignCenterIcon className={editor.isActive({textAlign: "center"}) ? "text-white" : "text-zinc-400"}/></div>
                    <div
                        onClick={() => editor.chain().focus().setTextAlign("right").run()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><AlignRightIcon className={editor.isActive({textAlign: "right"}) ? "text-white" : "text-zinc-400"}/></div>
                    <div
                        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><AlignJustifyIcon className={editor.isActive({textAlign: "justify"}) ? "text-white" : "text-zinc-400"}/></div>
                    <div className='w-[2rem]'></div>
                    <div
                        onClick={() => {
                            const url = window.prompt("URL")

                            if(url){
                                editor.chain().focus().setImage({src: url}).run()
                            }
                        }}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><ImageIcon className={ "active:text-white text-zinc-400"}/></div>
                    <div className='w-[2rem]'></div>
                    <div
                        onClick={() => editor.commands.undo()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><Undo2Icon className={ "active:text-white text-zinc-400"}/></div>
                    <div
                        onClick={() => editor.commands.unsetAllMarks()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><RemoveFormattingIcon className={ "active:text-white text-zinc-400"}/></div>
                    <div
                        onClick={() => editor.commands.redo()}
                        className={"p-[1rem] border-[1px] border-black bg-black cursor-pointer"}
                    ><Redo2Icon className={ "active:text-white text-zinc-400"}/></div>
                </div>
                <EditorContent className="p-[1rem] mb-[4rem] mt-[4rem]" editor={editor} />
            </>
            }
        </div>
    )
}