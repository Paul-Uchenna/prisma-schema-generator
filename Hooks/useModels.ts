import { useState } from "react";
import { Model } from "@/types"; // Assurez-vous d'importer le type `Model`

export function useModels() {
  const [models, setModels] = useState<Model[]>([]);

  const addModel = () => {
    const newModel: Model = {
      id: Date.now(),
      name: "",
      fields: [],
    };
    setModels((prev) => [...prev, newModel]);
  };

  const removeModel = (id: number) => {
    setModels((prev) => prev.filter((model) => model.id !== id));
  };

  const updateModel = (id: number, updatedModel: Model) => {
    setModels((prev) =>
      prev.map((model) => (model.id === id ? updatedModel : model))
    );
  };

  const generateSchema = () =>
    models.map((model) => {
      const fields = model.fields
        .map(
          (field) =>
            `  ${field.name} ${field.type}${field.required ? "" : "?"} ${
              field.unique ? "@unique" : ""
            }`
        )
        .join("\n");
      return `model ${model.name} {\n${fields}\n}`;
    });

  return { models, addModel, removeModel, updateModel, generateSchema };
}
