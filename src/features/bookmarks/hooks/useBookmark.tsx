import { useState } from "react";
import type { Bookmark } from "../../../types";
import { bookmarks } from "../../../data/bookmarks";

export const useBookmark = () => {
  const [bm, setBm] = useState(bookmarks);

  const addBookmark = (newBookmark: Bookmark) => {
    setBm((prevBookmarks) => [...prevBookmarks, newBookmark]);
  };

  return { bookmarks: bm, addBookmark };
};
