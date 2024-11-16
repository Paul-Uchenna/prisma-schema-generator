import { Input } from "@/components/ui/input";
import { useState, useCallback, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import AddDelete from "./AddDelete";

// Type pour représenter un champ
interface Field {
  id: number;
  name: string;
  type: string;
  defaultValue: string;
}

// Type pour les props du composant
interface FieldsProps {
  id: number;
  onDelete: (id: number) => void;
}

export default function Fields({ onDelete, id }: FieldsProps) {
  const [modelName, setModelName] = useState<string>("");
  const [modelNames, setModelNames] = useState<string[]>([]); // Liste des modèles
  const [createAtUpdateChecked, setCreateAtUpdateChecked] = useState(false);
  const [createRelationChecked, setCreateRelationChecked] = useState(false);
  const [fields, setFields] = useState<Field[]>([
    { id: 1, name: "", type: "String", defaultValue: "" },
  ]);

  // Fonction pour gérer les changements dans les champs
  const handleFieldChange = useCallback(
    (index: number, name: string, value: string) => {
      const updatedFields = [...fields];
      updatedFields[index] = { ...updatedFields[index], [name]: value };
      setFields(updatedFields);
    },
    [fields]
  );

  const addField = useCallback(() => {
    setFields((prevFields) => [
      ...prevFields,
      { id: prevFields.length + 1, name: "", type: "String", defaultValue: "" },
    ]);
  }, []);

  const removeField = (id: number) => {
    setFields((prevFields) => prevFields.filter((field) => field.id !== id));
  };

  // Liste des types de champ disponibles pour le sélecteur
  const fieldTypes = ["UUID", "String", "Int", "Boolean", "DateTime"];
  const relationTypes = [
    { name: "Select Relation Type", value: "default" },
    { name: "One to One", value: "OneToOne" },
    { name: "One to Many", value: "OneToMany" },
    { name: "Many to One", value: "ManyToOne" },
    { name: "Many to Many", value: "ManyToMany" },
  ];

  // Fonction pour gérer la saisie du nom du modèle
  const handleModelNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newModelName = e.target.value;
    setModelName(newModelName);

    // Si le modèle existe déjà, le mettre à jour dans la liste
    if (modelNames.includes(modelName)) {
      setModelNames((prevNames) =>
        prevNames.map((name) => (name === modelName ? newModelName : name))
      );
    }
  };

  // Fonction pour ajouter un modèle si unique, mais éviter la duplication
  const handleModelNameBlur = () => {
    if (modelName && !modelNames.includes(modelName)) {
      setModelNames((prevNames) => [...prevNames, modelName]);
    }
  };

  const updateModelNames = useCallback((oldName: string, newName: string) => {
    setModelNames((prevNames) =>
      prevNames.map((name) => (name === oldName ? newName : name))
    );
  }, []);

  useEffect(() => {
    if (modelName) {
      updateModelNames(modelName, modelName);
    }
  }, [modelName, updateModelNames]);

  return (
    <div className="w-[90vw] max-w-[400px] border p-3 rounded-md">
      <form className="flex flex-col">
        {/* Model Name Input */}
        <div>
          <label className="font-semibold">Model Name</label>
          <Input
            type="text"
            value={modelName}
            className="mt-3"
            onChange={handleModelNameChange}
            onBlur={handleModelNameBlur}
          />
        </div>

        {/* Options pour la création de relation */}
        <div className="flex flex-col gap-2 mt-4">
          <div>
            <input
              type="checkbox"
              id="createRelation"
              checked={createRelationChecked}
              onChange={(e) => setCreateRelationChecked(e.target.checked)}
              className="mr-3"
            />
            <label>Create Relation</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="createAtUpdate"
              checked={createAtUpdateChecked}
              onChange={(e) => setCreateAtUpdateChecked(e.target.checked)}
              className="mr-3"
            />
            <label>CreateAt/UpdatedAt</label>
          </div>

          {/* Afficher les paramètres de relation si sélectionné */}
          {createRelationChecked && (
            <div className="w-full flex flex-col gap-3 justify-between md:flex-row md:items-center mb-4">
              {/* Sélection du type de relation */}
              <div className="my-2 md:w-1/2">
                <h3 className="mb-2 font-bold">Model Relation</h3>
                <Select>
                  <SelectTrigger className="bg-gray-300">
                    <SelectValue placeholder="Select Relation Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sélection du modèle auquel le modèle est lié */}
              <div className="md:w-1/2">
                <h3 className="mb-2 font-bold">Model Related To</h3>
                <Select>
                  <SelectTrigger className="bg-gray-300">
                    <SelectValue placeholder="Select Model Related" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="RelatedTo">
                      Select Model Related To
                    </SelectItem>
                    {modelNames.map((name, index) => (
                      <SelectItem key={index} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Section des champs */}
        <h2 className="font-bold my-4">Fields</h2>

        {/* Afficher chaque champ */}
        {fields.map((field, index) => (
          <div key={field.id} className="border p-2 rounded-md mb-4">
            <div className="flex flex-col gap-3 md:flex-row justify-between mb-4">
              <Input
                type="text"
                name="name"
                value={field.name}
                onChange={(e) =>
                  handleFieldChange(index, "name", e.target.value)
                }
                placeholder="Field Name"
              />
              {/* Sélecteur de type de champ */}
              <Select
                onValueChange={(value) =>
                  handleFieldChange(index, "type", value)
                }
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder={field.type} />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Attributs du champ */}
            <div className="flex flex-wrap justify-between gap-3 mb-4">
              {["Primary Key", "Unique", "Required"].map((option) => (
                <div className="flex flex-wrap" key={option}>
                  <input
                    type="checkbox"
                    name={option}
                    id={option.toLowerCase().replace(" ", "")}
                  />
                  <label className="ml-3">{option}</label>
                </div>
              ))}
            </div>

            {/* Valeur par défaut et bouton pour supprimer le champ */}
            <div className="flex gap-10 md:justify-between">
              <Input
                type="text"
                name="defaultValue"
                value={field.defaultValue}
                onChange={(e) =>
                  handleFieldChange(index, "defaultValue", e.target.value)
                }
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

        {/* Boutons pour ajouter des champs et supprimer le modèle */}
        <AddDelete onAddField={addField} onDelete={onDelete} id={id} />
      </form>
    </div>
  );
}
