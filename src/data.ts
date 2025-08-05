import type { Bookmark } from "./types";

export const initialBookmarks: Bookmark[] = [
  {
    id: 1,
    type: "text",
    content:
      "texto normal lorem ipsum dolores ips amore miu dare tut papil laram marlen varids carmen malu lora plavu paslos ma",
    tags: [{name:"dev",color: "#000000"}],
    date: "2023-10-26T10:00:00Z",
  },
  {
    id: 2,
    type: "pdf",
    date: "2023-10-25T11:00:00Z",
  },
  {
    id: 3,
    type: "image",
    date: "2023-10-24T12:00:00Z",
  },
  {
    id: 4,
    type: "link",
    content: "link description that goes on and on...",
    date: "2023-10-23T13:00:00Z",
  },
  {
    id: 5,
    type: "list",
    content: 
      "teste "
    ,
    tags: [{name: "groceries",color: "#000000"}],
    date: "2023-10-22T14:00:00Z",
  },
  {
    id: 6,
    type: "unknown",
    date: "2023-10-21T15:00:00Z",
  },
  {
    id: 7,
    type: "text",
    content:
      "This is another piece of text to demonstrate the grid wrapping on different screen sizes.",
    tags: [{name:"ideas",color: "#000000"}],
    date: "2023-10-20T16:00:00Z",
  },
  {
    id: 8,
    type: "link",
    content: "The official documentation for React.",
    date: "2023-10-19T17:00:00Z",
  },
];