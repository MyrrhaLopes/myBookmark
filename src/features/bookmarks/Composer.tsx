import "@mdxeditor/editor/style.css";
import { useRef } from "react";
import type { Bookmark } from "../../types";
import { Paperclip, Send } from "lucide-react";
import {
  codeBlockPlugin,
  codeMirrorPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  type MDXEditorMethods,
} from "@mdxeditor/editor";

import type { Tag } from "../../types";
import { useHandleUpload } from "../fileManager/hooks/useFileUploader";
interface ComposerProps {
  addBookmark: (bookmark: Bookmark) => void;
}

export const Composer = ({ addBookmark }: ComposerProps) => {
  const mdxEditorRef = useRef<MDXEditorMethods>(null);
  const { files, setFiles } = useHandleUpload();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleAddBookmark = () => {
    const initialContent = mdxEditorRef.current?.getMarkdown() || "";
    if (initialContent.trim() === "") return;

    // Simple logic to determine type based on content
    let type: Bookmark["type"] = "text";
    if (
      initialContent.startsWith("http://") ||
      initialContent.startsWith("https://")
    ) {
      type = "link";
    } else if (initialContent.match(/\.(jpeg|jpg|gif|png)$/i)) {
      type = "image";
    } else if (initialContent.match(/\.pdf$/i)) {
      type = "pdf";
    }
    const tagRegex = /\\#(\S+)/g;
    const matches = initialContent.matchAll(tagRegex);
    const tagList: Tag[] = [];
    for (const match of matches) {
      tagList.push({ name: match[0].split("\\#")[1], color: "#000000" });
    }

    const content = initialContent.replace(tagRegex, "").trim();

    const newBookmark: Bookmark = {
      id: Date.now(), // Unique ID
      content: content,
      type: type,
      date: new Date().toISOString(),
      tags: tagList,
    };
    addBookmark(newBookmark); // Use the addBookmark function from props
    mdxEditorRef.current?.setMarkdown(""); // Clear the editor
  };
  // Normalize to an array (adjust if your hook already returns File[]):
  const fileArray = files ? Array.from(files) : [];

  return (
    <div className="p-4">
      <div className="relative bg-white border border-gray-300 rounded-lg flex flex-col">
        {fileArray.length > 0 && (
          <div
            className="flex w-full flex-wrap gap-2 p-2 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            title="Click to add more files"
          >
            {fileArray.map((f) => (
              <span
                key={f.name + f.lastModified}
                className="text-xs px-2 py-1 bg-gray-100 rounded border border-gray-200"
              >
                {f.name}
              </span>
            ))}
          </div>
        )}
        <MDXEditor
          ref={mdxEditorRef}
          markdown={""}
          plugins={[
            listsPlugin(),
            quotePlugin(),
            headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
            linkPlugin(),
            linkDialogPlugin(),
            imagePlugin({
              imageAutocompleteSuggestions: [
                "https://via.placeholder.com/150",
                "https://via.placeholder.com/150",
              ],
              imageUploadHandler: async () =>
                Promise.resolve("https://picsum.photos/200/300"),
            }),
            tablePlugin(),
            thematicBreakPlugin(),
            frontmatterPlugin(),
            codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                js: "JavaScript",
                css: "CSS",
                txt: "Plain Text",
                tsx: "TypeScript",
                "": "Unspecified",
              },
            }),
            markdownShortcutPlugin(),
          ]}
          className="w-full h-40 pl-4 pb-4 rounded-lg resize-y overflow-y-scroll outline-none"
        />
        {/* Buttons container */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button
            onClick={() => {
              handleAddBookmark();

              console.log(files);
              setFiles(undefined);
            }}
            className="bg-black text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <Send size={20} />
          </button>
          <button
            onClick={() => {
              console.log(mdxEditorRef.current?.getMarkdown());
            }}
            className="bg-red-400 text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <Send size={20} />
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-black text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <Paperclip size={20} />
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              setFiles(e.target.files);
              e.target.value = "";
            }
          }}
        />
      </div>
    </div>
  );
};
