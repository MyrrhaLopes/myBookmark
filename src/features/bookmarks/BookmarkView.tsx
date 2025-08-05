import { Composer } from "./components/Composer";
interface BookmarkViewProps {
  onClose: () => void;
}
//BUG Bookmarks sem conteúdo crasham o site

export const BookmarkView = ({ onClose }: BookmarkViewProps) => {
  return (
    <div
      className="fixed inset-0 bg-{#000030} backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-1/2 h-3/4 p-6 relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
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
        </button>
        <div className="overflow-y-auto h-full pb-12">
          <Composer></Composer>
        </div>
      </div>
    </div>
  );
};
