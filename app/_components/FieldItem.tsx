import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import Checkbox from "./checkbox/Checkbox";

interface Fields {
  id: number;
  name: string;
  type: string;
}

interface FieldItemProps {
  field: Fields;
  removeField: (id: number) => void;
}

export default function FieldItem({ field, removeField }: FieldItemProps) {
  const [fieldName, setFieldName] = useState<string>(field.name);
  const [defaultValue, setDefaultValue] = useState<string>("");

  return (
    <div>
      <div className="border p-2 rounded-md mb-4">
        <div className="flex items-center justify-between space-x-4 mb-4">
          <Input
            type="text"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            className="max-w-[250px]"
          />
          <Select>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="UUID">UUID</SelectItem>
              <SelectItem value="String">String</SelectItem>
              <SelectItem value="Int">Int</SelectItem>
              <SelectItem value="Boolean">Boolean</SelectItem>
              <SelectItem value="DateTime">DateTime</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center flex-wrap gap-3 md:gap-20 mb-4">
          {["Primary Key", "Unique", "Required"].map((option, index) => (
            <div key={index}>
              <Checkbox
                name={option}
                id={option.toLowerCase().replace(" ", "")}
                label={option}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between gap-2">
          <Input
            type="text"
            value={defaultValue}
            className="max-w-[250px]"
            placeholder="Default value"
            onChange={(e) => setDefaultValue(e.target.value)}
          />
          <button type="button" onClick={() => removeField(field.id)}>
            <Trash2
              size={30}
              className="bg-red-500 text-white p-1 rounded-sm"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
