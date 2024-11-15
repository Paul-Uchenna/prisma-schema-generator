"use client";

import { Input } from "@/components/ui/input";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import FieldItem from "./FieldItem";
import Checkbox from "./checkbox/Checkbox";

interface Fields {
  id: number;
  name: string;
  type: string;
}

export default function Fields() {
  const [fields, setFields] = useState<Fields[]>([
    { id: 1, name: "", type: "String" },
  ]);
  const [modelName, setModelName] = useState<string>("");
  const [generatedSchema, setGeneratedSchema] = useState<string>("");

  // const handleFieldChange = useCallback(
  //   (index, event) => {
  //     const updatedFields = [...fields];
  //     updatedFields[index][event.target.name] = event.target.value;
  //     setFields(updatedFields);
  //   },
  //   [fields]
  // );

  const addField = useCallback(() => {
    setFields([...fields, { id: fields.length + 1, name: "", type: "String" }]);
  }, [fields]);

  const removeField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const generateSchema = useCallback(() => {
    const schema =
      `model ${modelName} {\n` +
      fields.map((field) => `  ${field.name} ${field.type}`).join("\n") +
      "\n}";
    setGeneratedSchema(schema);
  }, [modelName, fields]);

  const fieldOptions = [
    {
      name: "createAt/updateAt",
      id: "createRelation",
      label: "Create Relation",
    },
    {
      name: "createAt/updateAt",
      id: "CreateAt/UpdatedAt",
      label: "CreateAt/UpdatedAt",
    },
  ];

  return (
    <div className="max-w-screen-lg mx-auto border p-5 rounded-md mt-5">
      <form className="flex flex-col">
        <div>
          <label className="font-semibold">Model Name</label>
          <Input
            type="text"
            value={modelName}
            className="mt-3"
            onChange={(e) => setModelName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          {fieldOptions.map((checkbox) => (
            <Checkbox
              key={checkbox.id}
              name={checkbox.name}
              id={checkbox.id}
              label={checkbox.label}
            />
          ))}
        </div>

        <h2 className="font-bold my-4">Fields</h2>

        {fields.map((field, index) => (
          <FieldItem key={field.id} field={field} removeField={removeField} />
        ))}

        <Button type="button" onClick={addField} className="font-semibold mt-4">
          Add field
        </Button>

        <div className="flex mt-4">
          <button className="flex items-center gap-2 rounded-md border p-1 font-semibold hover:bg-red-500 transition-all hover:text-white">
            <Trash2
              size={30}
              type="button"
              className="bg-red-500 text-white p-1 rounded-sm"
            />
            Delete model
          </button>
        </div>

        <button type="button" onClick={generateSchema} className="mt-4">
          Generate schema
        </button>

        {generatedSchema && (
          <div className="mt-4">
            <h3>Generated Prisma Schema</h3>
            <pre>{generatedSchema}</pre>
          </div>
        )}
      </form>
    </div>
  );
}
