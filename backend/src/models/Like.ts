import { Schema, model } from "mongoose";

const likeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
// Gör så att man bara kan gilla en post en gång per användare
likeSchema.index(
  {
    userId: 1,
    postId: 1,
  },
  {
    unique: true,
  },
);

export const Like = model("Like", likeSchema);
