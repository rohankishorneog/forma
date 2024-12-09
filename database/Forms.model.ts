import { Field_Types } from "@/app/types";
import { Schema, models, model, Document } from "mongoose";

export interface Forms extends Document {
  title: string;
  fields: Field_Types[];
}

const fieldSchema = new Schema<Field_Types>({
  type: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String },
  options: [{ type: String }],
  id: { type: String }, 
});

const formSchema = new Schema<Forms>(
  {
    title: { type: String, required: true },
    fields: [fieldSchema],
  },
  {
    timestamps: true, 
  }
);

export default models.Form || model<Forms>("Form", formSchema);
