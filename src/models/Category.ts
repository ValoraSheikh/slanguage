import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, required: true },
    emoji: { type: String, required: true },
    color: { type: String, required: true },
  },
  { timestamps: true },
);

export type CategoryDocument = InferSchemaType<typeof CategorySchema> & { _id: mongoose.Types.ObjectId };

export const Category: Model<CategoryDocument> =
  mongoose.models.Category ?? mongoose.model<CategoryDocument>("Category", CategorySchema);
