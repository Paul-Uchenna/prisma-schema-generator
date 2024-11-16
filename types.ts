export type Field = {
  name: string;
  type: string;
  required: boolean;
  unique: boolean;
};

export type Model = {
  id: number;
  name: string;
  fields: Field[];
};
