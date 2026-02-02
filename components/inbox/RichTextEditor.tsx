"use client"

import * as React from 'react'
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
    Quote,
    Check,
    X
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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

    const [linkUrl, setLinkUrl] = React.useState('')
    const [youtubeUrl, setYoutubeUrl] = React.useState('')
    const [isLinkOpen, setIsLinkOpen] = React.useState(false)
    const [isYoutubeOpen, setIsYoutubeOpen] = React.useState(false)

    if (!editor) {
        return null
    }

    const setLink = () => {
        if (!linkUrl) {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
        } else {
            editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
        }
        setIsLinkOpen(false)
        setLinkUrl('')
    }

    const addYoutubeVideo = () => {
        if (youtubeUrl) {
            editor.commands.setYoutubeVideo({
                src: youtubeUrl,
                width: 640,
                height: 480,
            })
        }
        setIsYoutubeOpen(false)
        setYoutubeUrl('')
    }

    return (
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 focus-within:ring-2 focus-within:ring-mivn-blue/20 transition-all shadow-sm">
            <div className="flex flex-wrap gap-1 p-2 bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-slate-800 items-center relative z-20">
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

                {/* Link Tool */}
                <div className="relative">
                    <ToolButton
                        onClick={() => {
                            if (isLinkOpen) {
                                setIsLinkOpen(false)
                            } else {
                                setIsLinkOpen(true)
                                setIsYoutubeOpen(false)
                                setLinkUrl(editor.getAttributes('link').href || '')
                            }
                        }}
                        isActive={editor.isActive('link') || isLinkOpen}
                        icon={LinkIcon}
                    />
                    {isLinkOpen && (
                        <div className="absolute top-full left-0 mt-2 z-50 w-80 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex gap-2">
                                <Input
                                    value={linkUrl}
                                    onChange={(e) => setLinkUrl(e.target.value)}
                                    placeholder="https://ejemplo.com"
                                    className="h-9 text-xs"
                                    autoFocus
                                />
                                <Button size="icon" className="h-9 w-9 shrink-0 bg-mivn-blue hover:bg-mivn-blue/90" onClick={setLink}>
                                    <Check className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Youtube Tool */}
                <div className="relative">
                    <ToolButton
                        onClick={() => {
                            if (isYoutubeOpen) {
                                setIsYoutubeOpen(false)
                            } else {
                                setIsYoutubeOpen(true)
                                setIsLinkOpen(false)
                            }
                        }}
                        isActive={editor.isActive('youtube') || isYoutubeOpen}
                        icon={YoutubeIcon}
                    />
                    {isYoutubeOpen && (
                        <div className="absolute top-full left-0 mt-2 z-50 w-80 p-3 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800">
                            <div className="flex gap-2">
                                <Input
                                    value={youtubeUrl}
                                    onChange={(e) => setYoutubeUrl(e.target.value)}
                                    placeholder="https://youtube.com/..."
                                    className="h-9 text-xs"
                                    autoFocus
                                />
                                <Button size="icon" className="h-9 w-9 shrink-0 bg-red-600 hover:bg-red-700 text-white" onClick={addYoutubeVideo}>
                                    <Check className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

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
