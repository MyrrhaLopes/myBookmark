import Markdown from "react-markdown";
import type { Bookmark } from "../../types";
import {
  Button,
  Menu,
  MenuItem,
  MenuTrigger,
  Popover,
} from "react-aria-components";
import { BoxSelect } from "lucide-react";
import { Tag } from "../tags/Tag";

interface BookmarkCardProps {
  bookmark: Bookmark;
  onClick: () => void;
  onUpdate: (id: number, updatedData: Partial<Bookmark>) => void;
  onDelete: (id: number) => void;
}

//TODO fazer case system mais robusto para tipos
export const BookmarkCard = ({
  bookmark,
  onClick,
  onUpdate,
  onDelete,
}: BookmarkCardProps) => {
  const Content = () => {
    switch (bookmark.type) {
      case "text":
      case "link":
        return (
          <>
            <Markdown>{bookmark.content as string}</Markdown>
          </>
        );
      case "pdf":
      case "image":
        return <img src={`${bookmark.content}`}></img>;
      case "unknown":
        return (
          <div className="flex items-center justify-center h-full">
            //TODO adicionar renderização de imagem e pdf
          </div>
        );

      default:
        return null;
    }
  };

  function deleteTag(tagName: string) {
    const currentTags = bookmark.tags ?? [];
    const newTags = currentTags.filter((tag) => tag.name !== tagName);
    onUpdate(bookmark.id, { tags: newTags });
  }

  return (
    <div
      className="relative bg-white border border-gray-300 rounded-lg p-4 h-64 hover:shadow-md transition-shadow duration-200 flex flex-col cursor-pointer"
      onClick={onClick}
    >
      <MenuTrigger>
        <Button aria-label="Menu" className={"absolute top-2 right-2"}>
          <BoxSelect size={20} />
        </Button>
        <Popover
          className={
            "bg-white border border-gray-300 rounded-lg hover:outline-none"
          }
        >
          <Menu className={"p-2"}>
            <MenuItem onAction={() => alert("select")}>Open</MenuItem>
            <MenuItem onAction={() => alert("share")}>Share…</MenuItem>
            <MenuItem onAction={() => onDelete(bookmark.id)}>Delete…</MenuItem>
          </Menu>
        </Popover>
      </MenuTrigger>
      <div className="flex-grow overflow-hidden overflow-y-scroll">
        {Content()}
      </div>
      <div className="flex flex-row w-full items-center justify-between">
        {bookmark.tags &&
          bookmark.tags.length > 0 &&
          bookmark.tags.map((tag) => (
            <Tag
              key={tag.name}
              name={tag.name}
              color={tag.color}
              deleteTag={deleteTag}
            ></Tag>
          ))}
      </div>
    </div>
  );
};
