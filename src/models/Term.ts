import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const TermSchema = new Schema(
  {
    term: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDefinition: { type: String, required: true },
    definition: { type: String, required: true },
    examples: [{ type: String }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category", index: true }],
    status: {
      type: String,
      enum: ["current", "peaking", "fading", "dated", "ironic"],
      default: "current",
      index: true,
    },
    relatedTerms: [{ type: Schema.Types.ObjectId, ref: "Term" }],
    isPublished: { type: Boolean, default: true, index: true },
    approvedAt: Date,
    lastReviewedAt: Date,
  },
  { timestamps: true },
);

TermSchema.index({ term: "text", shortDefinition: "text", definition: "text" });

export type TermDocument = InferSchemaType<typeof TermSchema> & { _id: mongoose.Types.ObjectId };

export const Term: Model<TermDocument> =
  mongoose.models.Term ?? mongoose.model<TermDocument>("Term", TermSchema);
