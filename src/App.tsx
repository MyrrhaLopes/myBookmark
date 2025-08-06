import { useState } from "react";
import type { Bookmark } from "./types";
import { BookmarkCard } from "./features/bookmarks/components/BookmarkCard";
import { Composer } from "./features/bookmarks/components/Composer";
import { useBookmark } from "./features/bookmarks/hooks/useBookmark";
import { BookmarkView } from "./features/bookmarks/BookmarkView";
import { Header } from "./components/ui/Header";
// --- Components ---

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
        onClick={() => onCardClick(bookmark)} //setEditingBookmark repassado de App (componente pai)
      />
    ))}
  </div>
);

export default function App() {
  const { bookmarks, addBookmark, updateBookmark } = useBookmark();
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);

  const handleCloseView = () => {
    setEditingBookmark(null); //Retirar qualquer bookmark do modo de edição
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
        <footer className="text-center p-4 text-gray-400 text-sm"></footer>
      </div>
    </div>
  );
}
