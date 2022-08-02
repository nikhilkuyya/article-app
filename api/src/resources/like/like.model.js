import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    article: {
      type: mongoose.Types.ObjectId,
      ref: "article",
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

LikeSchema.index({ user: 1, article: 1 }, { unique: true });
export const Like = mongoose.model("like", LikeSchema);
