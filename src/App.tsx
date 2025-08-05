import React, { useState, useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Filter, ChevronDown, User, Send } from "lucide-react";
import { initialBookmarks } from "./data";
import type { Bookmark } from "./types";
import { BookmarkCard } from "./Components/UI/BookmarkCard";
import { BookmarkView } from "./Components/UI/BookmarkView";
// --- Type Definitions ---
// Defining interfaces for our data structures and component props.

//TODO refletir sobre a estrutura correta do tipo bookmark

type SortByType = "date" | "title" | "type";
type FilterType =
  | "all"
  | "text"
  | "image"
  | "link"
  | "pdf"
  | "list"
  | "unknown";

// --- Components ---

interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
}

const Dropdown = ({ trigger, children }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (callback?: () => void) => {
    if (callback) callback();
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200">
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child as React.ReactElement<any>, {
                  onClick: () => handleSelect(child.props.onClick),
                })
              : child
          )}
        </div>
      )}
    </div>
  );
};

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
    <User size={32} className="text-gray-700" strokeWidth={1.5} />
  </header>
);

interface ControlsProps {
  setSortBy: (sort: SortByType) => void;
  setFilter: (filter: FilterType) => void;
  activeFilter: FilterType;
  activeSort: SortByType;
}

const Controls = ({
  setSortBy,
  setFilter,
  activeFilter,
  activeSort,
}: ControlsProps) => (
  <div className="flex items-center space-x-6 p-4">
    //FILTER DROPDOWN
    <Dropdown
      trigger={
        <button className="flex items-center text-gray-700 hover:text-black">
          <Filter size={18} className="mr-2" />
          <span>Filters</span>
          <ChevronDown size={16} className="ml-1" />
        </button>
      }
    >
      <a
        href="#"
        onClick={() => setFilter("all")}
        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
          activeFilter === "all" ? "font-bold" : ""
        }`}
      >
        All
      </a>
      <a
        href="#"
        onClick={() => setFilter("text")}
        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
          activeFilter === "text" ? "font-bold" : ""
        }`}
      >
        Text
      </a>
      <a
        href="#"
        onClick={() => setFilter("image")}
        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
          activeFilter === "image" ? "font-bold" : ""
        }`}
      >
        Images
      </a>
      <a
        href="#"
        onClick={() => setFilter("link")}
        className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
          activeFilter === "link" ? "font-bold" : ""
        }`}
      >
        Links
      </a>
    </Dropdown>
    // SORT DROPDOWN
    <Dropdown
      trigger={
        <div className="flex items-center space-x-2 text-gray-700 cursor-pointer">
          <span>Sort by</span>
          <button className="font-semibold text-black flex items-center capitalize">
            {activeSort}
            <ChevronDown size={16} className="ml-1" />
          </button>
        </div>
      }
    >
      <a
        href="#"
        onClick={() => setSortBy("date")}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Date
      </a>
      <a
        href="#"
        onClick={() => setSortBy("title")}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Title
      </a>
      <a
        href="#"
        onClick={() => setSortBy("type")}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Type
      </a>
    </Dropdown>
  </div>
);

interface BookmarkGridProps {
  bookmarks: Bookmark[];
  onBookmarkClick: (bookmark: Bookmark) => void;
}

const BookmarkGrid = ({ bookmarks, onBookmarkClick }: BookmarkGridProps) => (
  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {bookmarks.map((bookmark) => (
      <BookmarkCard
        key={bookmark.id}
        bookmark={bookmark}
        onClick={() => onBookmarkClick(bookmark)}
      />
    ))}
  </div>
);

const Composer = () => (
  <div className="p-4">
    <div className="relative bg-white border border-gray-300 rounded-lg">
      <textarea
        placeholder="Start typing..."
        className="w-full h-40 p-4 pr-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />
      <button className="absolute right-3 top-4 bg-black text-white w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
        <Send size={20} />
      </button>
    </div>
  </div>
);

//TODO implementar crud das bookmarks
export default function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks); //BOOKMARKS DE DATA COMO VALOR INICIAL
  const [sortBy, setSortBy] = useState<SortByType>("date");
  const [filter, setFilter] = useState<FilterType>("all");
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark | null>(null);

  const processedBookmarks = bookmarks
    .filter((bookmark) => {
      if (filter === "all") return true;
      return bookmark.type === filter;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "title" && a.content) {
        return String(a.content).localeCompare(String(b.content));
      }
      if (sortBy === "type") {
        return a.type.localeCompare(b.type);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-screen-xl mx-auto">
        <Header />
        <main>
          <Controls
            setSortBy={setSortBy}
            setFilter={setFilter}
            activeFilter={filter}
            activeSort={sortBy}
          />
          <BookmarkGrid
            bookmarks={processedBookmarks}
            onBookmarkClick={setSelectedBookmark}
          />
        </main>
        <Composer />
        <footer className="text-center p-4 text-gray-400 text-sm">
          <p>UI recreation by Gemini. Original design by Eraser.</p>
        </footer>
      </div>
      {selectedBookmark && (
        <BookmarkView
          bookmark={selectedBookmark}
          onClose={() => setSelectedBookmark(null)}
        />
      )}
    </div>
  );
}
