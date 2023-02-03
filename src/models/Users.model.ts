import mongoose, { Schema, Document, Types } from "mongoose";
import { Address } from "./Addresses.model";

export interface User extends Document {
  username: string;
  password: string;
  address: Types.ObjectId | Address;
}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: Types.ObjectId,
    ref: "Address",
    required: true,
  },
});

export default mongoose.model<User>("User", UserSchema);
