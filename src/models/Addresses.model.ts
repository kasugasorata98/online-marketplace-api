import mongoose, { Schema, Document, Types } from "mongoose";
import { User } from "./Users.model";

export interface Address extends Document {
  unitNo: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  user: Types.ObjectId | User;
}

const AddressSchema: Schema = new Schema<Address>(
  {
    unitNo: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
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

export default mongoose.model<Address>("Address", AddressSchema);
