"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilePlus2, PlusCircle, Trash2 } from "lucide-react";
import Fields from "./_components/Fields";

interface FieldComponentProps {
  id: number;
}

export default function Home() {
  const [fieldsComponents, setFieldsComponents] = useState<
    FieldComponentProps[]
  >([]);

  const [generatedSchema, setGeneratedSchema] = useState("");

  const addField = () => {
    const newFieldId = Date.now();
    setFieldsComponents([...fieldsComponents, { id: newFieldId }]);
  };

  const removeModel = (id: number) => {
    setFieldsComponents(
      fieldsComponents.filter((component) => component.id !== id)
    );
  };

  // const generateSchema = useCallback(() => {
  //   const schema =
  //     `model ${modelName} {\n` +
  //     fields.map((field) => `  ${field.name} ${field.type}`).join("\n") +
  //     "\n}";
  //   setGeneratedSchema(schema);
  // }, [modelName, fields]);

  return (
    <div className="pt-20 min-h-screen overflow-hidden">
      <div className="fixed top-0 left-0 right-0 h-20 w-full z-10 bg-white shadow-md flex items-center justify-between gap-10 px-5">
        <h1 className="text-4xl text-blue-500 font-bold text-center">
          PrismaGen
        </h1>
        <div className="flex gap-4">
          <Button
            type="button"
            onClick={addField}
            className="font-semibold hover:tracking-wide transition-all"
          >
            <PlusCircle /> Add Model
          </Button>

          {fieldsComponents.length > 0 && (
            <Button
              type="button"
              onClick={() => {}}
              className="font-semibold hover:tracking-wide transition-all"
            >
              <FilePlus2 /> Generate Model
            </Button>
          )}

          {fieldsComponents.length > 0 && (
            <Button
              type="button"
              variant="destructiveV2"
              onClick={() => setFieldsComponents([])}
              className="font-semibold hover:tracking-wide transition-all"
            >
              <Trash2 /> Clear Model
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-start md:justify-center lg:justify-start flex-wrap my-12 gap-x-5 gap-y-10 p-1 flex-grow ">
        {fieldsComponents.map((component) => (
          <div key={component.id} className="flex-shrink-0">
            <Fields
              id={component.id}
              onDelete={() => removeModel(component.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
