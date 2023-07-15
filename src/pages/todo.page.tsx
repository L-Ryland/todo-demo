import { TodoCard, AddTodoCard } from "@components/";
import { DragEventHandler, SyntheticEvent, useRef, useState } from "react";
import { PlusCircleIcon, CheckCircleIcon, XCircleIcon, TrashIcon } from "@heroicons/react/24/outline"
import { cx, css } from "@emotion/css";
export const Todo = () => {
  const [todoData, setTodoData] = useState([{}, {}, {}, {}]);
  const [isAddNew, setIsAddNew] = useState(false);
  const [hasDrag, setHasDrag] = useState(false);
  const [draggingItem, setDraggingItem] = useState<number>();
  const addNewTodo = () => {
    setIsAddNew(true)
    scrollTo({ behavior: 'smooth', top: document.body.scrollHeight })
  }
  const addRef = useRef<HTMLButtonElement>(null)
  const submitTodo = (data: unknown) => {
    todoData.push(data as {})
    setIsAddNew(false)
  }
  const onDragEnter = (index: number) => (() => {
    setDraggingItem(index)
    setHasDrag(true)
  }) satisfies DragEventHandler
  const onDrop = (event: SyntheticEvent, action: 'remove' | 'complete') => {
    console.log('action', action)
    if (draggingItem) {
      todoData.splice(draggingItem, 1)
    }
    setHasDrag(false)
  }
  const onDragOver = (event: SyntheticEvent) => {
    event.preventDefault()
  }
  return (
    <div>
      <div className="text-slate-200 text-7xl font-black">Daily Todo</div>
      <div className="mt-[39px] flex flex-col gap-[34px]">
        {todoData.map((todo, index) => (
          <TodoCard key={index} {...todo} onDragEnter={onDragEnter(index)} onDragEnd={() => setHasDrag(false)} />
        ))}
      </div>
      {isAddNew && <AddTodoCard ref={addRef} onSubmit={submitTodo} />}
      <div
        className={cx(
          ["sticky h-[224px] w-screen bottom-0"],
          css`
            background: linear-gradient(
              180deg,
              rgba(249, 250, 251, 0) 0%,
              #f9fafb 47.81%
            );
          `
        )}
      >
        <div className="absolute bottom-[49px] left-1/2 -translate-x-1/2">
          {isAddNew ? (
            <div className="flex gap-3 text-slate-400">
              <XCircleIcon
                className="h-9 w-9 cursor-pointer"
                onClick={() => setIsAddNew(false)}
              />
              <CheckCircleIcon
                className="h-9 w-9 cursor-pointer"
                onClick={() => addRef.current?.click()}
              />
            </div>
          ) : (
            <PlusCircleIcon
              className="h-9 w-9 text-slate-200 cursor-pointer"
              onClick={addNewTodo}
            />
          )}
        </div>
      </div>
      {hasDrag && (
        <>
          <TrashIcon
            className="h-32 w-32 text-gray-100 absolute left-32 top-1/2 -translate-y-1/2"
            onDrop={(event) => onDrop(event, "remove")}
            onDragOver={onDragOver}
          />
          <CheckCircleIcon
            className="h-32 w-32 text-gray-100 absolute right-32 top-1/2 -translate-y-1/2"
            onDrop={(event) => onDrop(event, "complete")}
            onDragOver={onDragOver}
          />
        </>
      )}
    </div>
  );
};
