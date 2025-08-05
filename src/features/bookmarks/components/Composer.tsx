import { useRef } from "react";
import type { Bookmark } from "../../../types";
import { Send } from "lucide-react";
import {
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  thematicBreakPlugin,
  type MDXEditorMethods,
} from "@mdxeditor/editor";

import type { Tag } from "../../../types";

interface ComposerProps {
  onAddBookmark: (bookmark: Bookmark) => void;
}

export const Composer = ({ onAddBookmark }: ComposerProps) => {
  const mdxEditorRef = useRef<MDXEditorMethods>(null);

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
    console.log(tagList);

    const content = initialContent.replace(tagRegex, "").trim();
    console.log(content);

    const newBookmark: Bookmark = {
      id: Date.now(), // Unique ID
      content: content,
      type: type,
      date: new Date().toISOString(),
      tags: tagList,
    };
    onAddBookmark(newBookmark);
    mdxEditorRef.current?.setMarkdown(""); // Clear the editor
  };
  //

  return (
    <div className="p-4">
      <div className="relative bg-white border border-gray-300 rounded-lg">
        <MDXEditor
          ref={mdxEditorRef}
          markdown={""}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            linkPlugin(),
            quotePlugin(),
            thematicBreakPlugin(),
            markdownShortcutPlugin(),
          ]}
          className="w-full h-40 p-4 pr-16 rounded-lg resize-y overflow-y-scroll outline-none focus:outline-none    "
        ></MDXEditor>
        <button
          onClick={handleAddBookmark}
          className="absolute right-3 top-4 bg-black text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};
