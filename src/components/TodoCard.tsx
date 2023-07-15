import { DragEventHandler, FC } from "react";
import { cx } from "@emotion/css";

export interface ITodoCard {
  title?: string;
  description?: string;
  tags?: ITag[];
}
interface ITodoCardProps extends ITodoCard {
  onDragEnter?: DragEventHandler;
  onDragEnd?: DragEventHandler
}
interface ITag {
  name: string;
  type: "danger" | "success";
}
const Tag: FC<ITag> = ({ name, type }) => {
  return (
    <div
      className={cx([
        "rounded-[10px] py-2 px-[5px] text-xs font-semibold w-max",
        { "bg-red-50 text-rose-600": type === "danger" },
        { "bg-green-50 text-green-600": type === "success" },
      ])}
    >
      {name}
    </div>
  );
};
export const TodoCard: FC<ITodoCardProps> = ({
  title = "Lorem ipsum dolor",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
  tags = [
    { name: "Lorem", type: "danger" },
    { name: "Ipsum", type: "success" },
  ],
  onDragEnter,
  onDragEnd
}) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm m-auto w-[445px] px-[34px] py-[26px] text-left"
      draggable
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
    >
      <div className="text-gray-700 text-2xl font-extrabold">{title}</div>
      <div className="line-clamp-2 text-gray-500 font-medium my-3">
        {description}
      </div>
      <div className="flex gap-[10px]">
        {tags.map((tag, index) => (
          <Tag key={index} {...tag} />
        ))}
      </div>
    </div>
  );
};
