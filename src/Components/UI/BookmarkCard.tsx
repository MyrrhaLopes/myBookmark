import type { Bookmark } from "../../types";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onClick: () => void;
}

//TODO fazer case system mais robusto para tipos
export const BookmarkCard = ({ bookmark, onClick }: BookmarkCardProps) => {
  const renderContent = () => {
    switch (bookmark.type) {
      case "text":
      case "link":
        return (
          <>
            <h3 className="font-bold text-lg mb-2">{bookmark.content}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {bookmark.content as string}
            </p>
          </>
        );
      case "pdf":
      case "image":
      case "unknown":
        return (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-500 font-semibold text-center">
              {bookmark.content}
            </span>
          </div>
        );

      default:
        return null;
    }
  };

  const renderTags = () => {
    if (!bookmark.tags || bookmark.tags.length === 0) return null;
    return (
      <div className="absolute bottom-3 left-3 flex space-x-2">
        {bookmark.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div
      className="relative bg-white border border-gray-300 rounded-lg p-4 h-64 hover:shadow-md transition-shadow duration-200 flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <div className="flex-grow overflow-hidden">{renderContent()}</div>
      {renderTags()}
    </div>
  );
};
