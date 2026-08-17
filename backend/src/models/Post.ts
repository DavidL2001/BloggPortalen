import { Schema, model, Types } from "mongoose";

export interface IPost {
  title: string;
  content: string;
  featuredImage: string;
  altText: string;
  authorId: Types.ObjectId;
  categoryId: Types.ObjectId;
}

const postSchema = new Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    content: {
      type: String,
      required: true,
    },

    featuredImage: {
      type: String,
      default: "",
    },

    // Tillagd alt text-fält för att lagra text för bilder, vilket är viktigt för tillgänglighet och SEO.
    altText: {
      type: String,
      default: "",
      trim: true,
      maxLength: 200,
    },

    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Post = model<IPost>("Post", postSchema);
