import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const TermSchema = new Schema(
  {
    term: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    aliases: [{ type: String, trim: true }],
    shortDefinition: { type: String, required: true },
    definition: { type: String, required: true },
    examples: [{ type: String }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category", index: true }],
    tags: [{ type: String, trim: true, index: true }],
    status: {
      type: String,
      enum: ["current", "peaking", "fading", "dated", "ironic"],
      default: "current",
      index: true,
    },
    safetyLabel: {
      type: String,
      enum: ["clean", "mild", "rude", "sensitive"],
      default: "clean",
      index: true,
    },
    usageNotes: String,
    caution: String,
    origin: String,
    relatedTerms: [{ type: Schema.Types.ObjectId, ref: "Term" }],
    isPublished: { type: Boolean, default: true, index: true },
    approvedAt: Date,
    lastReviewedAt: Date,
  },
  { timestamps: true },
);

TermSchema.index({ term: "text", aliases: "text", shortDefinition: "text", definition: "text", tags: "text" });

export type TermDocument = InferSchemaType<typeof TermSchema> & { _id: mongoose.Types.ObjectId };

export const Term: Model<TermDocument> =
  mongoose.models.Term ?? mongoose.model<TermDocument>("Term", TermSchema);
