"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FilePlus2, PlusCircle, Trash2 } from "lucide-react";
import Fields from "./_components/Fields";
import MobileNavbar from "./_components/MobileNavbar";

interface FieldComponent {
  id: number;
}

export default function Home() {
  const [fields, setFields] = useState<FieldComponent[]>([]);

  const addField = () => {
    const newField = { id: Date.now() };
    setFields((prev) => [...prev, newField]);
  };

  const removeModel = (id: number) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const clearFields = () => setFields([]);

  const generateSchema = () => {
    console.log("Generated schema for:", fields);
  };

  console.log(fields);

  return (
    <div className="md:pt-20 min-h-screen overflow-hidden">
      {/* Desktop Navbar */}
      <nav className="hidden md:fixed top-0 left-0 right-0 h-20 z-10 bg-white shadow-md md:flex items-center justify-between px-5">
        <h1 className="text-4xl bg-gradient-to-r from-[#fd821a] to-[#e22981] text-transparent bg-clip-text font-bold">
          PrismaGen
        </h1>
        <div className="flex gap-4">
          <Button
            onClick={addField}
            className="font-semibold hover:tracking-wide transition-all"
          >
            <PlusCircle /> Add Model
          </Button>
          {fields.length > 0 && (
            <>
              <Button
                onClick={generateSchema}
                className="font-semibold hover:tracking-wide transition-all"
              >
                <FilePlus2 /> Generate
              </Button>
              <Button
                onClick={clearFields}
                variant="destructiveV2"
                className="font-semibold hover:tracking-wide transition-all"
              >
                <Trash2 /> Clear
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <MobileNavbar
        onAdd={addField}
        onGenerate={generateSchema}
        onClear={clearFields}
        fields={fields}
      />

      {/* Fields */}
      <div className="flex flex-wrap gap-5 p-5 justify-center lg:justify-start">
        {fields.map((field) => (
          <Fields
            key={field.id}
            id={field.id}
            onDelete={() => removeModel(field.id)}
          />
        ))}
      </div>
    </div>
  );
}
