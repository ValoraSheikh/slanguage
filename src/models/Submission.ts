import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

const SubmissionSchema = new Schema(
  {
    term: { type: String, required: true, trim: true, index: true },
    suggestedDefinition: { type: String, required: true },
    suggestedExamples: [{ type: String }],
    suggestedCategorySlug: { type: String, required: true, index: true },
    suggestedTags: [{ type: String, trim: true }],
    suggestedStatus: {
      type: String,
      enum: ["current", "peaking", "fading", "dated", "ironic"],
    },
    sourceContext: String,
    notes: String,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected", "duplicate"],
      default: "pending",
      index: true,
    },
    reviewedAt: Date,
    reviewerNotes: String,
  },
  { timestamps: true },
);

export type SubmissionDocument = InferSchemaType<typeof SubmissionSchema> & { _id: mongoose.Types.ObjectId };

export const Submission: Model<SubmissionDocument> =
  mongoose.models.Submission ?? mongoose.model<SubmissionDocument>("Submission", SubmissionSchema);
