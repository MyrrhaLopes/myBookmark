type BookmarkType = "text" | "pdf" | "image" | "link" | "list" | "unknown";
export interface Tag {
  name: string;
  color: string;
}

export interface Bookmark {
  id: number;
  type: BookmarkType;
  content?: string | object;
  tags?: Tag[];
  date: string;
}

