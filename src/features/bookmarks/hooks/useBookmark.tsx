import { useState } from "react";
import type { Bookmark } from "../../../types";
import { bookmarks as initialBookmarks } from "../../../data/bookmarks";

export const useBookmark = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);

  /**
   * C(R)UD - Adds a new bookmark to the state.
   * In a real app, this would be an async function making a POST request.
   * Ex: const response = await fetch('/api/bookmarks', { method: 'POST', ... });
   */
  const addBookmark = (newBookmark: Bookmark) => {
    setBookmarks((prevBookmarks) => [newBookmark, ...prevBookmarks]);
  };

  /**
   * CR(U)D - Updates an existing bookmark.
   * In a real app, this would be an async function making a PUT/PATCH request.
   * Ex: await fetch(`/api/bookmarks/${id}`, { method: 'PATCH', ... });
   */
  const updateBookmark = (id: number, updatedData: Partial<Bookmark>) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.map((bookmark) =>
        bookmark.id === id ? { ...bookmark, ...updatedData } : bookmark
      )
    );
  };

  /**
   * CRU(D) - Deletes a bookmark from the state.
   * In a real app, this would be an async function making a DELETE request.
   * Ex: await fetch(`/api/bookmarks/${id}`, { method: 'DELETE' });
   */
  const deleteBookmark = (id: number) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((bookmark) => bookmark.id !== id)
    );
  };

  return { bookmarks, addBookmark, updateBookmark, deleteBookmark };
};
