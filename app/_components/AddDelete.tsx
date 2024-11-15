import { PlusCircle, Trash2 } from "lucide-react";

interface AddDeleteProps {
  onAddField: () => void;
  onDelete: (id: number) => void;
  id: number;
}

export default function AddDelete({
  onAddField,
  onDelete,
  id,
}: AddDeleteProps) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-2">
      <div className="w-full pr-7 flex justify-center items-center rounded-md border p-1 bg-emerald-600 text-white transition-all">
        <button
          type="button"
          onClick={onAddField}
          className="flex items-center gap-2 font-semibold"
        >
          <PlusCircle
            size={30}
            className="bg-emerald-600 text-white p-1 rounded-sm"
          />
          Add Field
        </button>
      </div>

      <div className="w-full flex justify-center items-center rounded-md border p-1 bg-red-500 text-white transition-all">
        <button
          type="button"
          onClick={() => onDelete(id)}
          className="flex items-center gap-2 font-semibold"
        >
          <Trash2 size={30} className="bg-red-500 text-white p-1 rounded-sm" />
          Delete model
        </button>
      </div>
    </div>
  );
}
