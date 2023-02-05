import mongoose, { Schema, Document } from "mongoose";

export interface Address extends Document {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

const AddressSchema: Schema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Address>("Address", AddressSchema);
