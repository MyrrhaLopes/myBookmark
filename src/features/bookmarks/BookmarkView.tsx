import { useRef, useEffect } from "react";
import type { Bookmark, Tag } from "../../types";
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
import { Save } from "lucide-react";

interface BookmarkViewProps {
  bookmark: Bookmark;
  onClose: () => void;
  onSave: (id: number, updatedData: Partial<Bookmark>) => void;
}

export const BookmarkView = ({
  bookmark,
  onClose,
  onSave,
}: BookmarkViewProps) => {
  const mdxEditorRef = useRef<MDXEditorMethods>(null);

  // Set the editor content when the modal opens or the bookmark changes
  useEffect(() => {
    const initialContent = (bookmark.content as string) || "";
    const tagsString =
      bookmark.tags?.map((tag) => `\\#${tag.name}`).join(" ") || "";
    mdxEditorRef.current?.setMarkdown(`${initialContent} ${tagsString}`);
  }, [bookmark]);

  const handleSave = () => {
    const newMarkdown = mdxEditorRef.current?.getMarkdown() || "";

    // Re-use logic from Composer to parse tags and content
    const tagRegex = /\\#(\S+)/g;
    const matches = newMarkdown.matchAll(tagRegex);
    const tagList: Tag[] = [];
    for (const match of matches) {
      tagList.push({ name: match[1], color: "#000000" }); // Assuming default color
    }
    const content = newMarkdown.replace(tagRegex, "").trim();

    const updatedData: Partial<Bookmark> = {
      content,
      tags: tagList,
    };

    onSave(bookmark.id, updatedData);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-1/2 min-h-1/2 p-6 relative animate-fade-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          {/* <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button> */}
        </div>

        <div className="relative flex-grow">
          <MDXEditor
            ref={mdxEditorRef}
            markdown={""} // Content is set via useEffect
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              linkPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
            ]}
            className="w-full h-full p-4 pr-16 rounded-lg resize-y overflow-y-scroll outline-none focus:outline-none border border-gray-200"
          />
          <button
            onClick={handleSave}
            className="absolute right-3 top-4 bg-black text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <Save size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
