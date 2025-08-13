import { X } from "lucide-react";
import { useState } from "react";
import { Button } from "react-aria-components";

type TagProps = {
  name: string;
  color?: string;
  className?: string;
  deleteTag: (name: string) => void;
};

export function Tag({ name, color, className, deleteTag }: TagProps) {
  const [hover, setHover] = useState<boolean>(false);
  const colorClass = color ? `bg-blue-200` : "bg-red-500";

  return (
    <div
      className={`py-1 ${colorClass} ${
        className ?? ""
      } rounded-xl px-3 flex flex-row items-center justify-between gap-2`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => e.stopPropagation()}
    >
      {name}
      {hover && (
        <Button
          aria-label={`Remove ${name}`}
          onClick={(e) => {
            e.stopPropagation();
            deleteTag(name);
          }}
        >
          <X size={15} />
        </Button>
      )}
    </div>
  );
}
