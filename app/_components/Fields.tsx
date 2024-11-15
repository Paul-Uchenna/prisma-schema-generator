"use client";

import { Input } from "@/components/ui/input";
import { useState, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";

interface FieldsProps {
  id: number;
  onDelete: (id: number) => void;
}

export default function Fields({ onDelete, id }: FieldsProps) {
  const [modelName, setModelName] = useState("");
  const [fields, setFields] = useState([
    { id: 1, name: "", type: "String", defaultValue: "" },
  ]);

  const handleFieldChange = useCallback(
    (index, event) => {
      const updatedFields = [...fields];
      updatedFields[index][event.target.name] = event.target.value;
      setFields(updatedFields);
    },
    [fields]
  );

  const handleTypeChange = (index, type) => {
    const updatedFields = [...fields];
    updatedFields[index].type = type;
    setFields(updatedFields);
  };

  const addField = useCallback(() => {
    setFields([
      ...fields,
      { id: fields.length + 1, name: "", type: "String", defaultValue: "" },
    ]);
  }, [fields]);

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  return (
    <div className="w-[90vw] max-w-[400px] mx-auto border p-3 rounded-md">
      <form className="flex flex-col">
        {/* Model Name Input */}
        <div>
          <label className="font-semibold">Model Name</label>
          <Input
            type="text"
            value={modelName}
            className="mt-3"
            onChange={(e) => setModelName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <div>
            <input
              type="checkbox"
              name="create relation"
              id="createRelation"
              className="mr-3"
            />
            <label>Create Relation</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="createAt/updateAt"
              id="dateNow"
              className="mr-3"
            />
            <label>CreateAt/UpdatedAt</label>
          </div>
        </div>

        <h2 className="font-bold my-4">Fields</h2>

        {/* Render each field */}
        {fields.map((field, index) => (
          <div key={field.id} className="border p-2 rounded-md mb-4">
            <div className="flex flex-col gap-3 md:flex-row justify-between mb-4">
              <Input
                type="text"
                name="name"
                value={field.name}
                onChange={(e) => handleFieldChange(index, e)}
                placeholder="Field Name"
                className=""
              />
              {/* Field Type Selector */}
              <Select onValueChange={(value) => handleTypeChange(index, value)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={field.type} />
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

            {/* Field Attributes */}
            <div className="flex flex-wrap gap-3 mb-4">
              {["Primary Key", "Unique", "Required"].map((option, index) => (
                <div className="flex flex-wrap" key={index}>
                  <input
                    type="checkbox"
                    name={option}
                    id={option.toLowerCase().replace(" ", "")}
                  />
                  <label className="ml-3">{option}</label>
                </div>
              ))}
            </div>

            {/* Default Value and Delete field Button  */}
            <div className="flex gap-10 md:justify-between">
              <Input
                type="text"
                name="defaultValue"
                value={field.defaultValue}
                onChange={(e) => handleFieldChange(index, e)}
                className="max-w-[250px]"
                placeholder="Default value"
              />
              <button type="button" onClick={() => removeField(field.id)}>
                <Trash2
                  size={30}
                  className="text-black p-1 rounded-sm hover:bg-red-500 hover:text-white transition-all"
                />
              </button>
            </div>
          </div>
        ))}

        {/* Add Field and Delete Model Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="w-full pr-7 flex justify-center items-center rounded-md border p-1 bg-emerald-600 text-white transition-all">
            <button
              type="button"
              onClick={addField}
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
              <Trash2
                size={30}
                className="bg-red-500 text-white p-1 rounded-sm"
              />
              Delete model
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
