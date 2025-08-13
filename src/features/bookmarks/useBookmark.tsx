// src/features/bookmarks/hooks/useBookmark.tsx
import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import type { Session } from "@supabase/supabase-js";
import type { Bookmark } from "../../types";

export const useBookmark = (session: Session | null) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    if (session) {
      getBookmarks();
    }
  }, [session]);

  async function getBookmarks() {
    const { data, error } = await supabase.from("bookmarks").select("*");
    if (error) {
      console.error("Error fetching bookmarks:", error);
      return;
    }
    setBookmarks(data || []);
  }

  const addBookmark = async (
    newBookmark: Omit<Bookmark, "id" | "date" | "user_id">
  ) => {
    if (!session) return;
    const { data, error } = await supabase
      .from("bookmarks")
      .insert({ ...newBookmark, user_id: session.user.id })
      .select()
      .single();
    if (error) {
      console.error("Error adding bookmark:", error);
    } else if (data) {
      setBookmarks([data, ...bookmarks]);
    }
  };

  const updateBookmark = async (id: number, updatedData: Partial<Bookmark>) => {
    const { data, error } = await supabase
      .from("bookmarks")
      .update(updatedData)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      console.error("Error updating bookmark:", error);
    } else if (data) {
      setBookmarks(
        bookmarks.map((bookmark) => (bookmark.id === id ? data : bookmark))
      );
    }
  };

  const deleteBookmark = async (id: number) => {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);
    if (error) console.error("Error deleting bookmark:", error);
    else setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id));
  };

  return { bookmarks, addBookmark, updateBookmark, deleteBookmark };
};
