import { SyntheticEvent, forwardRef, useState } from "react";
import { useForm } from "react-hook-form";
import type { ITodoCard } from "./TodoCard";

interface ITodoForm extends ITodoCard {}
interface IAddTodoCard {
  onSubmit: (form: ITodoForm) => void
}
export const AddTodoCard = forwardRef<HTMLButtonElement, IAddTodoCard>(({ onSubmit }, ref) => {
  const { register, handleSubmit, getValues, setValue } = useForm<ITodoForm>({
    defaultValues: {
      title: "",
      description: "",
      tags: [{ name: "", type: "danger" }],
    },
    shouldUnregister: false,
  });
  const [tagGroups, setTagGroups] = useState([1, 2, 3, 4]);
  const [activeTag, setActiveTag] = useState(0);
  const setTag = (event: SyntheticEvent, index: number) => {
    event.preventDefault()
    const tagsValue = getValues('tags')
    if (index === 0 || tagsValue?.[index]) {
      setActiveTag(index)
    } else if (tagsValue?.[index - 1]) {
      setValue(`tags.${index}`, { name: '', type: 'success' })
      setActiveTag(index)
    }
  }
  return (
    <form className="bg-white shadow-sm rounded-lg max-w-[455px] mx-auto mt-[34px] p-[42px] flex flex-col gap-[14px]" onSubmit={handleSubmit(onSubmit)}>
      <input
        className="border-gray-100 indent-3.5 text-slate-200"
        placeholder="Todo Title"
        {...register("title")}
      />
      <textarea
        rows={2}
        placeholder="Todo Description"
        className="border-gray-100 indent-3.5 text-slate-200 resize-none"
        {...register('description')}
      ></textarea>
      <input
        className="border-gray-100 indent-3.5 text-slate-200"
        placeholder="Tags"
        {...register(`tags.${activeTag}.name`)}
      />
      <div className="mt-[15px] flex gap-[18px]">
        {tagGroups.map((tag, index) => (
          <button
            className="border-gray-100 text-gray-400 px-[14px] py-2 rounded-md cursor-pointer"
            key={index}
            onClick={(event) => setTag(event, index)}
          >
            {tag}
          </button>
        ))}
      </div>
      <button className="hidden" type="submit" ref={ref}></button>
    </form>
  );
});
