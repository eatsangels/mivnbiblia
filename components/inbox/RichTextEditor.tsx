"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Youtube from '@tiptap/extension-youtube'
import LinkExtension from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Link as LinkIcon,
    Youtube as YoutubeIcon,
    Quote
} from 'lucide-react'

interface RichTextEditorProps {
    content?: string
    onChange: (html: string) => void
    placeholder?: string
}

export function RichTextEditor({ content = "", onChange, placeholder = "Escribe tu mensaje..." }: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder,
                emptyEditorClass: 'is-editor-empty before:content-[attr(data-placeholder)] before:text-slate-400 before:float-left before:pointer-events-none',
            }),
            Youtube.configure({
                controls: false,
                nocookie: true,
            }),
            LinkExtension.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-mivn-blue underline cursor-pointer',
                },
            }),
        ],
        content,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-6 text-slate-800 dark:text-slate-200',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
    })

    if (!editor) {
        return null
    }

    const addYoutubeVideo = () => {
        const url = prompt('Ingresa la URL del video de YouTube')

        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
                width: 640,
                height: 480,
            })
        }
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        if (url === null) {
            return
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }


    return (
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-mivn-blue/20 transition-all shadow-sm">
            <div className="flex flex-wrap gap-1 p-2 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-slate-800">
                <ToolButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive('bold')}
                    icon={Bold}
                />
                <ToolButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive('italic')}
                    icon={Italic}
                />
                <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10 mx-1 my-auto" />
                <ToolButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive('bulletList')}
                    icon={List}
                />
                <ToolButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive('orderedList')}
                    icon={ListOrdered}
                />
                <ToolButton
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    isActive={editor.isActive('blockquote')}
                    icon={Quote}
                />
                <div className="w-[1px] h-6 bg-slate-200 dark:bg-white/10 mx-1 my-auto" />
                <ToolButton
                    onClick={setLink}
                    isActive={editor.isActive('link')}
                    icon={LinkIcon}
                />
                <ToolButton
                    onClick={addYoutubeVideo}
                    isActive={editor.isActive('youtube')}
                    icon={YoutubeIcon}
                />
            </div>
            <EditorContent editor={editor} className="cursor-text" />

            <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: #94a3b8;
          pointer-events: none;
          height: 0;
        }
        .ProseMirror ul {
            list-style-type: disc;
            padding-left: 1.5em;
        }
        .ProseMirror ol {
            list-style-type: decimal;
            padding-left: 1.5em;
        }
        .ProseMirror blockquote {
            border-left: 3px solid #e2e8f0;
            padding-left: 1em;
            margin-left: 0;
            font-style: italic;
        }
         /* Dark mode overrides for manual styles */
        :global(.dark) .ProseMirror blockquote {
            border-left-color: #334155;
        }
      `}</style>
        </div>
    )
}

function ToolButton({ onClick, isActive, icon: Icon }: { onClick: () => void, isActive: boolean, icon: any }) {
    return (
        <button
            type="button"
            onClick={(e) => { e.preventDefault(); onClick(); }}
            className={`p-2 rounded-lg transition-colors ${isActive ? 'bg-mivn-blue text-white shadow-md' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-white/10'}`}
        >
            <Icon className="w-4 h-4" />
        </button>
    )
}
