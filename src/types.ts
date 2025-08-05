type type = "text" | "pdf" | "image" | "link" | "list" | "unknown";


export interface Bookmark {
  id: number;
  type:type;
  content?: string;
  tags?: string[];
  date: string;
}


export type SortByType = "date" | "content" | "type";

export type FilterType = type