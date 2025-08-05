type type = "text" | "pdf" | "image" | "link" | "list" | "unknown";
export interface Tag {
  name: string;
  color: string;
}

export interface Bookmark {
  id: number;
  type: type;
  content?: string | object;
  tags?: Tag[];
  date: string;
}


export type SortByType = "date" | "content" | "type";

export type FilterType = type