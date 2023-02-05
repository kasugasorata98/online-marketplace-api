import mongoose, { Schema, Document, Types } from "mongoose";
import { Product } from "./Products.model";
import { User } from "./Users.model";

export interface Cart extends Document {
  quantity: number;
  shippingMethod: "standard" | "on-demand";
  product: Types.ObjectId | Product;
  user: Types.ObjectId | User;
}

const CartSchema: Schema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    shippingMethod: {
      type: String,
      enum: ["standard", "on-demand"],
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Cart>("Cart", CartSchema);
