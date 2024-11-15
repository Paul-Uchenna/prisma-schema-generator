"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCcw } from "lucide-react";
import Fields from "./_components/Fields";

export default function Home() {
  const [fieldsComponents, setFieldsComponents] = useState<JSX.Element[]>([]);

  // ! Function to add a new Fields component to the list
  const addField = () => {
    setFieldsComponents([
      ...fieldsComponents,
      <Fields key={fieldsComponents.length} />,
      // <Fields key={fieldsComponents.length} />,
    ]);
  };

  return (
    <div className="flex items-center justify-center flex-col p-5 space-y-3">
      <h1 className="text-5xl text-blue-500 font-bold text-center">
        PrismaGen
      </h1>
      <p className="text-md"> Prisma Schema Generator</p>
      <Button
        type="button"
        onClick={addField}
        className="font-semibold hover:tracking-wide transition-all"
      >
        <Plus /> Add Model
      </Button>

      <div className="mt-4 space-y-3 w-full">{fieldsComponents}</div>
      <div>
        {fieldsComponents.length > 0 && (
          <div className="flex bg-red-500 rounded-md">
            <RefreshCcw size={32} className=" text-white p-1 rounded-sm" />
            <Button
              type="button"
              onClick={() => setFieldsComponents([])}
              variant="destructiveV2"
              className="flex items-center gap-2 border p-1 font-semibold  hover:bg-red-500 transition-all hover:text-white"
            >
              Clear All Models
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
