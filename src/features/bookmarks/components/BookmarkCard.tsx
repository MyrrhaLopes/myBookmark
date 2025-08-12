import Markdown from "react-markdown";
import type { Bookmark } from "../../../types";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onClick: () => void;
}

//TODO fazer case system mais robusto para tipos
export const BookmarkCard = ({ bookmark, onClick }: BookmarkCardProps) => {
  const Content = () => {
    switch (bookmark.type) {
      case "text":
      case "link":
        return (
          <>
            <Markdown>{bookmark.content as string}</Markdown>
          </>
        );
      case "pdf":
      case "image":
        return <img src={`${bookmark.content}`}></img>;
      case "unknown":
        return (
          <div className="flex items-center justify-center h-full">
            //TODO adicionar renderização de imagem e pdf
          </div>
        );

      default:
        return null;
    }
  };

  const Tags = () => {
    if (!bookmark.tags || bookmark.tags.length === 0) return null;
    return bookmark.tags.map((tag) => (
      <div
        key={tag.name}
        className="w-fit h-fit rounded-sm text-white px-2 content-center flex itemns-center"
        style={{ backgroundColor: tag.color }}
      >
        {tag.name}
      </div>
    ));
  };

  return (
    <div
      className="relative bg-white border border-gray-300 rounded-lg p-4 h-64 hover:shadow-md transition-shadow duration-200 flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-grow overflow-hidden overflow-y-scroll">
        {Content()}
      </div>
      <div className="flex flex-row w-full items-center justify-between">
        {Tags()}
      </div>
    </div>
  );
};
