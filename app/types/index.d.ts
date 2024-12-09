export interface Field_Types {
  id?: string;
  type: string;
  label: string;
  placeholder?: string;
  options?: string[];
}

export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}

export interface Form_Type{
  title:string
  _id:string
  fields:Field_Types[]
}