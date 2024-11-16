"use client";

import { Button } from "@/components/ui/button";
import { FilePlus2, PlusCircle, Trash2 } from "lucide-react";

interface MobileNavbarProps {
  onAdd: () => void;
  onGenerate: () => void;
  onClear: () => void;
  fields: Array<{ id: number }>;
}

export default function MobileNavbar({
  onAdd,
  onGenerate,
  onClear,
  fields,
}: MobileNavbarProps) {
  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between p-2">
        <h1 className="text-2xl bg-gradient-to-r from-[#fd821a] to-[#e22981] text-transparent bg-clip-text font-bold">
          PrismaGen
        </h1>
        <Button onClick={onAdd} variant="outline" className="font-semibold">
          <PlusCircle /> Add Model
        </Button>
      </div>

      {fields.length > 0 && (
        <div className="flex justify-center gap-2 mt-2">
          <Button onClick={onGenerate} className="font-semibold">
            <FilePlus2 /> Generate
          </Button>
          <Button
            onClick={onClear}
            variant="destructiveV2"
            className="font-semibold"
          >
            <Trash2 /> Clear
          </Button>
        </div>
      )}
    </div>
  );
}
