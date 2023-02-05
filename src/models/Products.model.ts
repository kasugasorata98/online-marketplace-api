import mongoose, { Schema, Document, Types } from "mongoose";
import { Store } from "./Stores.model";

export interface Product extends Document {
  title: string;
  price: number;
  images: string[];
  details: string;
  store: Types.ObjectId | Store;
}

const ProductSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    details: {
      type: String,
      required: true,
    },
    store: {
      type: Types.ObjectId,
      ref: "Store",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Product>("Product", ProductSchema);
