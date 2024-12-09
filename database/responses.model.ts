import { model, models, Schema, Document, ObjectId } from "mongoose";

// Define the Responses interface
export interface Responses extends Document {
  formId: ObjectId;
  formTitle: string;
  responseData: { [key: string]: any };
}

// Response schema
const responseSchema = new Schema<Responses>(
  {
    formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
    formTitle: { type: String },
    responseData: { type: Schema.Types.Mixed },
  },
  {
    timestamps: true,
  }
);

// Export the Response model
const Response =
  models.Response || model<Responses>("Response", responseSchema);
export default Response;
