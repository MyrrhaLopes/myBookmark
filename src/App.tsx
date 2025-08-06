import { useState } from "react";
import type { Bookmark } from "./types";
import { BookmarkCard } from "./features/bookmarks/components/BookmarkCard";
import { Composer } from "./features/bookmarks/components/Composer";
import { useBookmark } from "./features/bookmarks/hooks/useBookmark";
import { BookmarkView } from "./features/bookmarks/BookmarkView";

// --- Components ---

const Header = () => (
  <header className="flex items-center justify-between p-4 border-b border-gray-200">
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
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
          className="text-gray-500"
        >
          <path d="m15 5-3 3-3-3 3-3 3 3z" />
          <path d="m6 15 3 3 3-3-3-3-3 3z" />
          <path d="M9 9 3 3" />
          <path d="m21 21-6-6" />
          <path d="m21 3-6 6" />
          <path d="m3 21 6-6" />
        </svg>
      </div>
      <span className="text-2xl font-bold text-gray-800">myBookmark</span>
    </div>
  </header>
);

interface BookmarkGridProps {
  bookmarks: Bookmark[];
  onCardClick: (bookmark: Bookmark) => void;
}

const BookmarkGrid = ({ bookmarks, onCardClick }: BookmarkGridProps) => (
  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {bookmarks.map((bookmark) => (
      <BookmarkCard
        key={bookmark.id}
        bookmark={bookmark}
        onClick={() => onCardClick(bookmark)}
      />
    ))}
  </div>
);

export default function App() {
  const { bookmarks, addBookmark, updateBookmark } = useBookmark();
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);

  const handleCloseView = () => {
    setEditingBookmark(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-screen-xl mx-auto">
        <Header />
        <main>
          <BookmarkGrid
            bookmarks={bookmarks}
            onCardClick={setEditingBookmark}
          />
        </main>
        <Composer addBookmark={addBookmark} />
        {editingBookmark && (
          <BookmarkView
            bookmark={editingBookmark}
            onClose={handleCloseView}
            onSave={updateBookmark}
          />
        )}
        <footer className="text-center p-4 text-gray-400 text-sm">
          <p>UI recreation by Gemini. Original design by Eraser.</p>
        </footer>
      </div>
    </div>
  );
}
