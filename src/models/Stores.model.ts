import mongoose, { Schema, Document, Types } from "mongoose";
import { Product } from "./Products.model";
import { User } from "./Users.model";

export interface Store extends Document {
  name: string;
  image: string;
  user: Types.ObjectId | User;
  products: Array<Types.ObjectId | Product>;
}

const StoreSchema: Schema = new Schema<Store>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Store>("Store", StoreSchema);
