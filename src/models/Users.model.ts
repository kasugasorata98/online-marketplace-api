import mongoose, { Schema, Document, Types } from "mongoose";
import { Address } from "./Addresses.model";
import { Store } from "./Stores.model";

export interface User extends Document {
  username: string;
  password: string;
  addresses: Array<Types.ObjectId | Address>;
  stores: Array<Types.ObjectId | Store>;
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Address",
      },
    ],
    stores: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Store",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("User", UserSchema);
